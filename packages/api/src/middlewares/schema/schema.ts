import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { BadRequest } from '../error/error';

function handler(req: Request, res: Response, next: any) {
  const schemaErros = validationResult(req);

  try {
    if (!schemaErros.isEmpty()) {
      throw new BadRequest(undefined, schemaErros.array());
    }
    next();
  } catch (error: any) {
    next(error);
  }
}

export { handler };
