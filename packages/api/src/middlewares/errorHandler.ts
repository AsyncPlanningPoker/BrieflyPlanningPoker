import { Response } from 'express';
import { CustomError } from '../utils/error';

function errorHandler(error: CustomError | Error, res: Response) {
  if (error instanceof CustomError) {
    return res.status(error.getCode()).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
}

export { errorHandler };
