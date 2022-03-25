import { Knex } from 'knex';
import { CreateUserType, findByCredentialsType, FindUserType, IStoreUser, LoadedUserType, UpdateUserType } from '../types/users';

class UserDbStore implements IStoreUser {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  async create(user: CreateUserType): Promise<void> {
    await this.#client('users').insert(user);
  }

  async find(ids: FindUserType[]): Promise<LoadedUserType[]> {
    return this.#client.select('id', 'name', 'email').from('users').whereIn('id', ids);
  }

  async findByCredentials(user: findByCredentialsType): Promise<LoadedUserType | undefined> {
    const res = await this.#client.select('id', 'name', 'email').from('users').where({
      email: user.email,
      password: user.password,
    });

    if (res.length > 0) {
      const user: LoadedUserType = {
        id: res[0].id,
        name: res[0].name,
        email: res[0].name,
      };

      return user;
    }
  }

  async updateById(id: FindUserType, user: UpdateUserType): Promise<void> {
    await this.#client('users').where('id', id).update({
      name: user.name,
      updatedAt: user.updatedAt,
    });
  }
}

export { UserDbStore };
