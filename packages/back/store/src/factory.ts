import { UserDbStore } from './stores/users';
import knex from 'knex';
import knexfile from '../knexfile';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
}

class FactoryStore {
  protected client = knex(knexfile);

  createStores(): FactoryStoreResult {
    return { userDbStore: new UserDbStore(this.client) };
  }
}

export { FactoryStore };
