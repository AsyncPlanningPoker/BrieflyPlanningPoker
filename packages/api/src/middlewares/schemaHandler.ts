import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

function schemaError(req: Request, res: Response, next: any) {
  const schemaErros = validationResult(req);

  if (!schemaErros.isEmpty()) {
    return res.status(400).json({ errors: schemaErros.array() });
  }

  next();
}

export { schemaError };
