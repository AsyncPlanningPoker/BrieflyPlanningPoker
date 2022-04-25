import { UserDbStore } from './stores/users';
import knex, { Knex } from 'knex';
import knexfile from '../knexfile';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
  close: () => void;
}

class FactoryStore {
  protected client: Knex<any, unknown[]> = knex(knexfile);

  createStores(): FactoryStoreResult {
    const close = () => {
      return this.client.destroy();
    };

    return { userDbStore: new UserDbStore(this.client), close };
  }
}

export { FactoryStore };
