import { AddSquadMembersType, CreateSquadType, DelSquadMembersType, IStoreSquad, LoadedSquadsByUserIdType, UpdateSquadType } from '../types/squads';
import { fromSquadDb } from '../mapping';
import { Knex } from 'knex';
import { randomUUID } from 'crypto';

class SquadDbStore implements IStoreSquad {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async addSquadMembersById(squadId: string, users: AddSquadMembersType[]): Promise<{ squad: any[]; users: any[] }> {
    const [usersDb, squadDb] = await Promise.all([
      this.#client('users')
        .select('name', 'id', 'email')
        .whereIn(
          'email',
          users.map((user) => {
            return user.email;
          })
        )
        .where({ enabled: true })
        .catch((error) => {
          throw new Error(error.detail);
        }),
      this.#client('squad')
        .select('name', 'id')
        .where({ enabled: true })
        .catch((error) => {
          throw new Error(error.detail);
        }),
    ]);

    if (usersDb.length !== 0 && squadDb.length !== 0) {
      for (const user of usersDb) {
        await this.#client('squads-users')
          .insert({ id: randomUUID(), user: user.id, squad: squadId, enabled: false })
          .catch((error) => {
            throw new Error(error.detail);
          });
      }
    }

    return { squad: squadDb, users: usersDb };
  }

  async delSquadMembersById(squadId: string, users: DelSquadMembersType[]): Promise<void> {
    for (const user of users) {
      await this.#client('squads-users')
        .where({ squad: squadId, user: user.id, enabled: true })
        .update({
          enabled: false,
          updatedAt: new Date(),
        })
        .catch((error) => {
          throw new Error(error.detail);
        });
    }
  }

  async updateById(squadId: string, squad: UpdateSquadType): Promise<void> {
    await this.#client('squads')
      .where({ id: squadId, enabled: true })
      .update({ ...squad, updatedAt: new Date() })
      .catch((error) => {
        throw new Error(error.detail);
      });
  }

  async del(squadId: string): Promise<void> {
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
    ]).catch((error) => {
      throw new Error(error.detail);
    });
  }

  async list(userId: string): Promise<LoadedSquadsByUserIdType[]> {
    const res = await this.#client
      .select('squads.id as squadId', 'squads.name as squad', 'currentMaxRounds', 'currentPercentual', 'users.id as userId', 'users.name as user', 'users.email as email', 'squads.updatedAt')
      .from('squads-users')
      .join(
        this.#client
          .select('squad')
          .from('squads-users')
          .where({
            user: userId,
          })
          .as('squadsUsers'),
        'squadsUsers.squad',
        'squads-users.squad'
      )
      .leftJoin('users', 'users.id', '=', 'squads-users.user')
      .leftJoin('squads', 'squads.id', '=', 'squads-users.squad')
      .where({ 'squads.enabled': true, 'users.enabled': true, 'squads-users.enabled': true })
      .catch((error) => {
        throw new Error(error.detail);
      });

    return fromSquadDb(res);
  }

  async create(squad: CreateSquadType): Promise<void> {
    await this.#client('squads')
      .insert({ id: squad.id, name: squad.name, currentMaxRounds: squad.currentMaxRounds, currentPercentual: squad.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(async () => {
        await this.addSquadMembersById(squad.id, squad.members);
      })
      .catch((error) => {
        throw new Error(error.detail);
      });
  }
}

export { SquadDbStore };
