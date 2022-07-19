import { AddSquadUsersType, CreateSquadType, DelSquadUsersType, IStoreSquad, LoadedSquadsByUserIdType, UpdateSquadType } from '../types/squad';
import { fromSquadDb, fromSquadUsersDb } from '../mapping';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';

class SquadDbStore implements IStoreSquad {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async addSquadUsersByEmail(squadId: string, users: AddSquadUsersType[], isOwner = false): Promise<LoadedSquadsByUserIdType | void> {
    const [usersDb, squadDb] = await Promise.all([
      this.#client('users')
        .select('name', 'id', 'email')
        .whereIn('email', users.map((res)=> res.email))
        .where({ enabled: true }),
      this.#client('squads')
        .select('name', 'id')
        .where({ id: squadId, enabled: true })
    ]);

    if (usersDb.length !== 0 && squadDb.length !== 0) {
      for (const user of usersDb) {
        await this.#client('squads-users')
          .insert({ id: randomUUID(), user: user.id, squad: squadId, enabled: isOwner })
      }
      return fromSquadUsersDb(squadDb[0], usersDb);
    }
  }

  async delSquadUsersByEmail(squadId: string, users: DelSquadUsersType[]): Promise<void> {
      await this.#client('squads-users')
        .where({ squad: squadId, user: this.#client('users').select('id').whereIn('email', users.map((user) => user.email)), enabled: true })
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

  async delById(squadId: string): Promise<void> {
    const date = new Date();

    await Promise.all([
      this.#client('squads').where({ id: squadId, enabled: true }).update({
        enabled: false,
        updatedAt: date,
      }),
      this.#client('squads-users').where({ squad: squadId, enabled: true }).update({
        enabled: false,
        updatedAt: date,
      }),
    ])
  }

  async list(email: string): Promise<LoadedSquadsByUserIdType[]> {
    const res = await this.#client
      .select('squads.id as squadId', 'squads.name as squad', 'currentMaxRounds', 'currentPercentual', 'users.id as userId', 'users.name as user', 'users.email as email', 'squads.updatedAt')
      .from('squads-users')
      .join(
        this.#client
          .select('squad')
          .from('squads-users')
          .where({
            user:  this.#client('users').select('id').where({email}),
          })
          .as('squadsUsers'),
        'squadsUsers.squad',
        'squads-users.squad'
      )
      .leftJoin('users', 'users.id', '=', 'squads-users.user')
      .leftJoin('squads', 'squads.id', '=', 'squads-users.squad')
      .where({ 'squads.enabled': true, 'users.enabled': true, 'squads-users.enabled': true })

    return fromSquadDb(res);
  }

  async create(squad: CreateSquadType): Promise<LoadedSquadsByUserIdType | void> {
    return this.#client('squads')
      .insert({ id: squad.id, name: squad.name, currentMaxRounds: squad.currentMaxRounds, currentPercentual: squad.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(async () => {
        return this.addSquadUsersByEmail(squad.id, squad.users, true);
      })
      .catch((error) => {
        throw new Error(error.detail);
      });
  }
}

export { SquadDbStore };
