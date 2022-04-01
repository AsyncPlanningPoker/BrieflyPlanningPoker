import { UserDbStore } from './stores/users';
import knex, { Knex } from 'knex';
import knexfile from '../knexfile';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
  close: () => Promise<void>;
}

class FactoryStore {
  protected client: Knex<any, unknown[]> = knex(knexfile);

  async createStores(): Promise<FactoryStoreResult> {
    const close = () => {
      return this.client.destroy();
    };

    return { userDbStore: new UserDbStore(this.client), close };
  }
}

export { FactoryStore };
