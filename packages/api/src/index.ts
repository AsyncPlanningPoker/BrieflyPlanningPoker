import express, { NextFunction, Request, Response } from 'express';
import { CustomError } from './middlewares/error/error';
import * as error from './middlewares/error/handler';
import bodyParser from 'body-parser';
import routes from './routes/index';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

function listen(): void {
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`BrieflyPlanningPoker app  listening at ${port} port`);
    });
  }
}

function setExit(): void {
  process.on('SIGTERM', () => {
    process.exit(0);
  });

  process.on('SIGINT', () => {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    error.handler(err, res);
  });
}

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

setMiddlewares();
setExit();
listen();

export default app;
