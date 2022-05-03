import { Unauthorized } from '../error/error';
import { Response, Request } from 'express';
import * as auth from './authorization';

function handler(req: Request, res: Response, next: any) {
  const token = req.headers.authorization;
  const isValid = token?.includes('Bearer') ? auth.verify(token.replace('Bearer', '').trim()) : false;

  try {
    if (isValid?.role === 'login') {
      next();
    } else {
      throw new Unauthorized('Invalid token');
    }
  } catch (error: any) {
    next(error);
  }
}

export { handler };
