import { SquadDbStore } from './stores/squad';
import { UserDbStore } from './stores/user';
import { TaskDbStore } from './stores/task';
import { VotingDbStore } from './stores/voting';
import knexfile from '../knexfile';
import knex, { Knex } from 'knex';

interface FactoryStoreResult {
  userDbStore: UserDbStore;
  squadDbStore: SquadDbStore;
  taskDbStore: TaskDbStore;
  votingDbStore: VotingDbStore;
  close: () => void;
}

class FactoryStore {
  protected client: Knex<any, unknown[]> = knex(knexfile);

  createStores(): FactoryStoreResult {
    const close = () => {
      return this.client.destroy();
    };

    return { 
        userDbStore: new UserDbStore(this.client), 
        squadDbStore: new SquadDbStore(this.client), 
        taskDbStore: new TaskDbStore(this.client), 
        votingDbStore: new VotingDbStore(this.client), 
        close 
    };
  }
}

export { FactoryStore };
