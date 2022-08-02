import { CreateSquadType, IStoreSquad, LoadedSquadsByUserIdType, LoadedUsersBySquadIdType, SquadUsersType, UpdateSquadType } from '../types/squad';

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

  async list(email: string): Promise<LoadedSquadsByUserIdType[]> {
    const res = await this.#client
      .select('squads.id as id', 'squads.name as squad', 'currentMaxRounds', 'currentPercentual', 'squads.updatedAt')
      .from('squads-users')
      .where({user: (await this.#client('users').select('id').where({enabled:true, email}))[0].id})
      .leftJoin('squads', 'squads.id', '=', 'squads-users.squad')
      .where({ 'squads.enabled': true, 'squads-users.enabled': true })
      .orderBy('squads.updatedAt', 'desc')
    return res;
  }

  async listUsers(squadId: string): Promise<LoadedUsersBySquadIdType[]> {
    const res = await this.#client
      .select('users.id as id', 'users.name as name', 'users.email as email')
      .where({squad:squadId})
      .from('squads-users')
      .leftJoin('users', 'users.id', '=', 'squads-users.user')
      .where({ 'users.enabled': true, 'squads-users.enabled': true })

    return res;
  }

  async create(squad: CreateSquadType): Promise<LoadedSquadsByUserIdType | void> {
    return await this.#client('squads')
      .insert({ id: squad.id, name: squad.name, currentMaxRounds: squad.currentMaxRounds, currentPercentual: squad.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(() => {
        return {id: squad.id, squad: squad.name}
      })
  }
}

export { SquadDbStore };
