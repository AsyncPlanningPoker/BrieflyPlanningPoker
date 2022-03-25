import { UserDbStore } from './stores/users';
import knex from 'knex';
import knexfile from '../knexfile';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
}

async function createStores(): Promise<FactoryStoreResult> {
  const client = knex(knexfile);
  const userDbStore = new UserDbStore(client);
  return { userDbStore };
}

export { createStores };
