import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand'
import morgan from 'morgan';
import cors from 'cors';
import context, { type Context } from './context';
import { CustomError, handler as errorHandler } from './middlewares/error';
import routes from './routes';
import { ZodiosApp, zodiosApp } from '@zodios/express';
import apiDef, { type ApiDef } from '@briefly/prisma/dist/apiDef';
import { handler } from './middlewares/authorization';

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
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.json());
  app.use(handler);
  app.use(routes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res);
  });
}


expand(dotenv.config());
const port = process.env.PORT ?? 8000;

const app: ZodiosApp<ApiDef, Context> = context.app(apiDef);

setMiddlewares();
setExit();
listen();

export default app ;
