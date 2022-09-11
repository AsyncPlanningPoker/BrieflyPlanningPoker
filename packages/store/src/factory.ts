import { UserDbStore } from './stores/user';
import { SquadDbStore } from './stores/squad';
import { TaskDbStore } from './stores/task';
import knex, { Knex } from 'knex';
import knexfile from '../knexfile';


interface FactoryStoreResult {
  userDbStore: UserDbStore;
  squadDbStore: SquadDbStore;
  taskDbStore: TaskDbStore;
  close: () => void;
}

class FactoryStore {
  protected client: Knex<any, unknown[]> = knex(knexfile);

  createStores(): FactoryStoreResult {
    const close = () => {
      return this.client.destroy();
    };

    return { userDbStore: new UserDbStore(this.client), squadDbStore: new SquadDbStore(this.client), taskDbStore: new TaskDbStore(this.client), close };
  }
}

export { FactoryStore };
