import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand'
import morgan from 'morgan';
import cors from 'cors';
import type { Express } from 'express';
import context, { type Context } from 'context';
import { CustomError, handler as errorHandler } from './middlewares/error';
import routes from './routes';
import { ZodiosApp, zodiosApp } from '@zodios/express';
import apiDef, { type ApiDef } from '@briefly/prisma/dist/apiDef';

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

  // app.use(
  //   bodyParser.urlencoded({
  //     extended: true,
  //   })
  // );

  // app.use(express.json());
  app.use(routes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res);
  });
}

expand(dotenv.config());
const expressApp = express();
const port = process.env.PORT ?? 8000;

setMiddlewares();
setExit();
listen();
const app: ZodiosApp<ApiDef, Context> = zodiosApp(apiDef, { context });

export default app ;
