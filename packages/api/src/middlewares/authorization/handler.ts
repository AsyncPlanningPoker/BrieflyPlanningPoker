// import { Response, Request, NextFunction } from 'express';
import { ZodiosHandler, ZodiosRequestHandler } from '@zodios/express';
import { Unauthorized } from '../error/error';
import * as auth from './authorization';
// import { pluginToken } from '@zodios/plugins';
import { type ApiDef } from '@briefly/prisma/src/apiDef';
import { type Context } from 'context';
import { ZodiosPathsByMethod } from '@zodios/core';
import { type Method } from 'routes/utils';

type Path = ZodiosPathsByMethod<ApiDef, Method>;

export type ZodiosMiddleware = ZodiosRequestHandler<ApiDef, Context, Method, Path>

const handler: ZodiosMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const isValid = token?.includes('Bearer') ? auth.verify(token.replace('Bearer', '').trim()) : undefined;

  try {
    if (isValid?.role === 'login') {
      req.user = { email: isValid.user };
      next();
    } else {
      throw new Unauthorized('Invalid token');
    }
  } catch (error: unknown) {
    next(error);
  }
}

export { handler };
