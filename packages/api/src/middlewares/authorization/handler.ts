import { Request } from 'express';
import { Unauthorized } from '../error/error';
import * as auth from './authorization';
import type { ZodiosNextFunction, ZodiosRequest, ZodiosResponse } from '../../utils/types';


function handler (req: ZodiosRequest, res: ZodiosResponse, next: ZodiosNextFunction): void {
  const token = req.headers.authorization;

  if(! token) return next();

  const isValid = token.includes('Bearer') ? auth.verify(token.replace('Bearer', '').trim()) : undefined;

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

function mustAuth (req: Request, res: any, next: ZodiosNextFunction): void {
  if(!("user" in req)) next(new Unauthorized("You must log-in!"));
  else next();
}

export { handler, mustAuth };
