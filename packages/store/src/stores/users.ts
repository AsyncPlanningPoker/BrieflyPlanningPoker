import { CreateUserType, IStoreUser, LoadedUserType, UpdateUserPassType } from '../types/users';
import { fromUserDb } from '../mapping';
import { Knex } from 'knex';

class UserDbStore implements IStoreUser {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async create(user: CreateUserType): Promise<void> {
    await this.#client('users')
      .insert(user)
      .catch((error) => {
        throw new Error(error.detail);
      });
  }

  async findByEmail(email: string): Promise<LoadedUserType | undefined> {
    const res = await this.#client.select('id', 'name', 'email', 'password').from('users').where({
      email: email,
      enabled: true,
    });

    if (res.length > 0) {
      return fromUserDb(res[0]);
    }
  }

  async updatePassByEmail(email: string, user: UpdateUserPassType): Promise<void> {
    await this.#client('users').where({ email: email, enabled: true }).update({
      password: user.password,
      updatedAt: user.updatedAt,
    });
  }
}

export { UserDbStore };
