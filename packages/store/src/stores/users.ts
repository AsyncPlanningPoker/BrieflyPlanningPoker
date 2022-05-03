import { Knex } from 'knex';
import { CreateUserType, FindByEmailType, IStoreUser, LoadedUserType, UpdateUserType } from '../types/users';

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

  async findByEmail(email: FindByEmailType): Promise<LoadedUserType | undefined> {
    const res = await this.#client.select('id', 'name', 'email', 'password').from('users').where({
      email: email,
    });

    if (res.length > 0) {
      const user: LoadedUserType = {
        id: res[0].id,
        name: res[0].name,
        email: res[0].name,
        password: res[0].password,
      };

      return user;
    }
  }

  async updatePassByEmail(email: FindByEmailType, user: UpdateUserType): Promise<void> {
    await this.#client('users').where('email', email).update({
      password: user.password,
      updatedAt: user.updatedAt,
    });
  }
}

export { UserDbStore };
