import { CustomError } from '../middlewares/error/error';
import { NextFunction, Request, Response } from 'express';

async function vote(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const task = {
    task: req.params.taskId,
    squad: req.params.squadId,
    email: req.query.user,
    points: req.body.points
  };

  const db = req.app.get('votingDbStore');

  try {
    await db
      .vote(task)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function message(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const task = {
    task: req.params.taskId,
    squad: req.params.squadId,
    email: req.query.user,
    message: req.body.message
  };

  const db = req.app.get('votingDbStore');

  try {
    await db
      .createMessage(task)
      .then(() => {
        return res.sendStatus(200);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}




export { vote, message };
