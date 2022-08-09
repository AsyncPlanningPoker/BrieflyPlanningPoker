import { CreateSquadType, IStoreSquad, LoadedSquadsByUserIdType, LoadedSquadsType, SquadUsersType, UpdateSquadType } from '../types/squad';

import { Knex } from 'knex';
import { randomUUID } from 'crypto';

class SquadDbStore implements IStoreSquad {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async addSquadUsersByEmail(squadId: string, email: string, owner: boolean): Promise<SquadUsersType | void> {
    const [userDb, squadDb] = await Promise.all([
      this.#client('users')
        .select('name', 'id', 'email')
        .where({ email, enabled: true }),
      this.#client('squads')
        .select('name', 'id')
        .where({ id: squadId, enabled: true })
    ]);

    if (userDb.length !== 0 && squadDb.length !== 0) {
        await this.#client('squads-users')
          .insert({ id: randomUUID(), user: userDb[0].id, squad: squadId, enabled: owner })
      
      return userDb[0]
    }
  }

  async delSquadUserByEmail(squadId: string, email: string): Promise<void> {
      await this.#client('squads-users')
        .where({ squad: squadId, user: (await this.#client('users').select('id').where({email, enabled: true}))[0].id, enabled: true})
        .update({
          enabled: false,
          updatedAt: new Date(),
        })
  }

  async updateById(squadId: string, squad: UpdateSquadType): Promise<void> {
    await this.#client('squads')
      .where({ id: squadId, enabled: true })
      .update({ ...squad, updatedAt: new Date() })
  }

  async findAll(email: string): Promise<LoadedSquadsType[]> {
    const res = await this.#client
      .select('squads-users.squad as id')
      .from('squads-users')
      .where({user: (await this.#client('users').select('id').where({enabled:true, email}))[0].id, 'squads-users.enabled': true })
      .orderBy('squads-users.squad', 'desc')
      
    return res;
  }

  async find(squadId: string): Promise<LoadedSquadsByUserIdType|void> {
    
    const res = await this.#client
      .select('squads.id as squad', 'squads.name as squadName', 'squads.currentMaxRounds', 'squads.currentPercentual', 'squads.updatedAt', 'users.id as user', 'users.name as userName', 'users.email as email')
      .where({squad:squadId})
      .from('squads-users')
      .leftJoin('users', 'users.id', '=', 'squads-users.user')
      .leftJoin('squads', 'squads.id', '=', 'squads-users.squad')
      .where({ 'users.enabled': true, 'squads-users.enabled': true })
      .orderBy('squads.updatedAt', 'desc')
  
    if(res.length > 0){
      return {
        id: res[0].squad,
        squad: res[0].squadName,
        currentMaxRounds: res[0].currentMaxRounds,
        currentPercentual:  res[0].currentPercentual,
        updatedAt: res[0].updatedAt,
        users: res.map((r)=> {
          return {
            id: r.user,
            name: r.userName,
            email: r.email
          }
        })
      }
    }
  }

  async create(squad: CreateSquadType): Promise<LoadedSquadsType | void> {
    await this.#client('squads')
      .insert({ id: squad.id, name: squad.name, currentMaxRounds: squad.currentMaxRounds, currentPercentual: squad.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(() => {
        return {id: squad.id}
      })
  }
}

export { SquadDbStore };
