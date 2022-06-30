import { UserDbStore } from './stores/users';
import { SquadDbStore } from './stores/squads';
import knex, { Knex } from 'knex';
import knexfile from '../knexfile';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
  squadDbStore: SquadDbStore;
  close: () => void;
}

class FactoryStore {
  protected client: Knex<any, unknown[]> = knex(knexfile);

  createStores(): FactoryStoreResult {
    const close = () => {
      return this.client.destroy();
    };

    return { userDbStore: new UserDbStore(this.client), squadDbStore: new SquadDbStore(this.client), close };
  }
}

export { FactoryStore };
