import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';
import cors from 'cors';
import { FactoryStore } from '@briefly/store';

// process.on('SIGTERM', () => {
//   console.log(9);
// });
// process.on('SIGINT', () => {
//   console.log('Hey Boss I just Received SIGINT.');
// });

class Server {
  private app = express();
  private port = process.env.PORT || 8000;
  private closeDb!: () => Promise<void>;

  middlewares() {
    this.app.use(morgan('tiny'));
    this.app.use(cors());

    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.app.use(express.json());
    this.app.use(routes);
  }

  async storeDb() {
    const factory = new FactoryStore();
    const { close } = await factory.createStores();
    this.closeDb = close;
    //this.userDbStore = userDbStore;
  }

  constructor() {
    //this.app.set('userDbStore', this.userDbStore);
    this.storeDb();
    this.middlewares();

    if (require.main === module) {
      this.app.listen(this.port, () => {
        return console.log(`BrieflyPlanningPoker app  listening at ${this.port} port`);
      });
    }
  }
}

export const server = new Server();
