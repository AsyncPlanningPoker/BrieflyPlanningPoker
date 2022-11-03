import { IStoreUser, UserType, UpdateUserType } from '../types/user';
import { Knex } from 'knex';

class UserDbStore implements IStoreUser {
  #client: Knex<any, unknown[]>;

  constructor(client: Knex<any, unknown[]>) {
    this.#client = client;
  }

  //Create a new user. Since the users table has email and id field as unique, in case the new user has an email or id that already exists, then the application will throw an error
  async create(user: UserType): Promise<void> {
    await this.#client('users')
      .insert(user)
      .catch((error) => {
        throw new Error(error.detail);
      });
  }

  //Find a valid user by its email
  async findByEmail(email: string): Promise<UserType | undefined> {
    const res = await this.#client.select('id', 'name', 'email', 'password').from('users').where({ email, enabled: true });
    return res[0];
  }

  //Update the password user by its email
  async updatePassByEmail(email: string, user: UpdateUserType): Promise<void> {
    await this.#client('users')
      .where({ email: email, enabled: true })
      .update({ ...user });
  }

  //Delete a user by its email
  async deleteByEmail(email: string, user: UpdateUserType): Promise<void> {
    await this.#client('users')
      .where({ email: email, enabled: true })
      .update({
        enabled: false,
        ...user,
      });
  }
}

export { UserDbStore };
