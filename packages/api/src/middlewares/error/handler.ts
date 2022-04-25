import { CustomError } from './error';
import { Response } from 'express';

function handler(error: CustomError | Error, res: Response) {
  if (error instanceof CustomError) {
    return res.status(error.getCode()).json({
      status: 'error',
      message: error.json ?? error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
}

export { handler };
