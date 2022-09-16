import { CustomError } from '../middlewares/error/error';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const task = {
    id: randomUUID(),
    squad: req.params.squadId,
    name: req.body.name,
    description: req.body.description
  };

  const db = req.app.get('taskDbStore');

  try {
    await db
      .create(task)
      .then(() => {
        return res.status(201).json({ id: task.id });
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function deactive(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const task = {
    id: req.params.taskId,
    squad: req.params.squadId
  };

  const db = req.app.get('taskDbStore');

  try {
    await db
      .deactive(task)
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

async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const task = {
    id: req.params.taskId,
    squad: req.params.squadId
  };

  const db = req.app.get('taskDbStore');

  try {
    await db
      .delete(task)
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

async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const db = req.app.get('taskDbStore');
  
  const task = {
    squad: req.params.squadId
  };

  try {
    await db
      .findAll(task)
      .then(async (result: any) => {
        return res.status(200).json(result);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

export { create, deactive, deleteTask, findAll };
