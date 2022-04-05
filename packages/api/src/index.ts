import { FactoryStore } from '@briefly/store';
import bodyParser from 'body-parser';
import routes from './routes/index';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

function listen(): void {
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`BrieflyPlanningPoker app  listening at ${port} port`);
    });
  }
}

function setDb() {
  const factory = new FactoryStore();
  const { close, userDbStore } = factory.createStores();
  app.set('userDbStore', userDbStore);
  return close;
}

function setExit(): void {
  process.on('SIGTERM', () => {
    close();
    process.exit(0);
  });

  process.on('SIGINT', () => {
    close();
    process.exit(0);
  });
}

function setMiddlewares() {
  app.use(morgan('tiny'));
  app.use(cors());

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(express.json());
  app.use(routes);
}

const app = express();
const port = process.env.PORT || 8000;
const close = setDb();

setMiddlewares();
setExit();
listen();

export default app;