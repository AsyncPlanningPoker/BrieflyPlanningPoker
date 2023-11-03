import { ZodiosApp, zodiosApp } from '@zodios/express';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand'
import morgan from 'morgan';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express'
import { apiDef, type ApiDef } from '@briefly/apidef';

import context, { type Context } from './context';
import { CustomError, handler as errorHandler } from './middlewares/error';
import routes from './routes';
import { handler } from './middlewares/authorization';
import { bearerAuthScheme, openApiBuilder } from '@zodios/openapi';

function listen(): void {
  app.listen(port, () => {
    console.log(`BrieflyPlanningPoker app  listening at ${port} port`);
  });
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
  app.use("/api", routes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res);
  });
  app.use("/docs/swagger.json", (_, res) => res.json(doc));
  app.use("/docs", serve);
  app.use("/docs", setup(undefined, {swaggerUrl: "/docs/swagger.json"}));
}


expand(dotenv.config());
const port = process.env.PORT ?? 8000;

const app: ZodiosApp<ApiDef, Context> = context.app(apiDef);

const doc = openApiBuilder({
  title: "Briefly Planning Poker API",
  version: "1.0.0",
  description: "The API for the Briefly Planning Poker application"
})
  .addServer({url: "/api"})
  .addSecurityScheme("Bearer token", bearerAuthScheme())
  .addProtectedApi("Bearer token", apiDef)
  .build()

setMiddlewares();
setExit();
listen();

export default app ;
