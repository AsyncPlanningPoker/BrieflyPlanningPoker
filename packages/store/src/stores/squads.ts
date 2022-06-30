import { CreatedSquadType, CreateSquadType, IStoreSquad, LoadedSquadsByUserIdType, SquadMembers, UpdateSquadsUsersType, UpdateSquadType } from '../types/squads';
import { fromSquadDb } from '../mapping';
import { Knex } from 'knex';

class SquadDbStore implements IStoreSquad {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async createSquadsUsersById(squadId: string, users: UpdateSquadsUsersType[]): Promise<SquadMembers[]> {
    const res: { id: string; name: any; email: any }[] = [];
    for (const user of users) {
      await this.#client('squads-users')
        .insert({ id: user.squadsUsersId, user: user.userId, squad: squadId })
        .then(async () => {
          const userDb = await this.#client('users').select('email', 'name').where({ id: user.userId });
          res.push({ id: user.userId, name: userDb[0].name, email: userDb[0].email });
        })
        .catch((error) => {
          throw new Error(error.detail);
        });
    }
    return res;
  }

  async deleteSquadUsersById(squadId: string, users: UpdateSquadsUsersType[]): Promise<void> {
    for (const user of users) {
      await this.#client('squads-users')
        .where({ squad: squadId, enabled: true })
        .update({
          enabled: false,
          updatedAt: user.updatedAt,
        })
        .catch((error) => {
          throw new Error(error.detail);
        });
    }
  }

  async updateById(squadId: string, squad: UpdateSquadType): Promise<void> {
    await this.#client('squads')
      .where({ id: squadId, enabled: true })
      .update(squad)
      .catch((error) => {
        throw new Error(error.detail);
      });
  }

  async delete(squadId: string, squad: UpdateSquadType): Promise<void> {
    await Promise.all([
      this.#client('squads').where({ id: squadId, enabled: true }).update({
        enabled: false,
        updatedAt: squad.updatedAt,
      }),
      this.#client('squads-users').where({ squad: squadId, enabled: true }).update({
        enabled: false,
        updatedAt: squad.updatedAt,
      }),
    ]).catch((error) => {
      console.log(error);
      throw new Error(error.detail);
    });
  }

  async list(userId: string): Promise<LoadedSquadsByUserIdType[]> {
    const res = await this.#client
      .select('squads.id as squadId', 'squads.name as squad', 'currentMaxRounds', 'currentPercentual', 'users.id as userId', 'users.name as user', 'squads.updatedAt')
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

  async create(squad: CreateSquadType): Promise<CreatedSquadType> {
    const users: { id: string; name: any; email: any }[] = [];
    await this.#client('squads')
      .insert({ id: squad.id, name: squad.name, currentMaxRounds: squad.currentMaxRounds, currentPercentual: squad.currentPercentual })
      .catch((error) => {
        throw new Error(error.detail);
      })
      .then(async () => {
        for (const user of squad.users) {
          const [, userDb] = await Promise.all([this.#client('squads-users').insert({ id: user.squadsUsersId, user: user.id, squad: squad.id, enabled: false }), this.#client('users').select('email', 'name').where({ id: user.id })]);
          users.push({ id: user.id, name: userDb[0].name, email: userDb[0].email });
        }
      })
      .catch((error) => {
        throw new Error(error.detail);
      });
    return { id: squad.id, users };
  }
}

export { SquadDbStore };
