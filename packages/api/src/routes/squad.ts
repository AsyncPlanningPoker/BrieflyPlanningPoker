import { CustomError } from '../middlewares/error/error';
import { NextFunction, Request, Response } from 'express';
import send from '../services/email';
import { randomUUID } from 'crypto';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = { email: req.query.email };
  const squad = {
    id: randomUUID(),
    name: req.body.name,
    users: [email],
    currentMaxRounds: req.body.currentMaxRounds,
    currentPercentual: req.body.currentPercentual,
  };

  const db = req.app.get('squadDbStore');

  try {
    await db
      .create(squad)
      .then(() => {
        return res.status(201).json({ id: squad.id });
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function list(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = req.query.email;
  const db = req.app.get('squadDbStore');

  try {
    await db
      .list(email)
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

async function del(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const db = req.app.get('squadDbStore');

  try {
    await db
      .del(squadId)
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

async function update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const squad = {
    name: req.body.name,
    currentMaxRounds: req.body.currentMaxRounds,
    currentPercentual: req.body.currentPercentual,
  };

  const db = req.app.get('squadDbStore');

  try {
    await db
      .updateById(squadId, squad)
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

async function addUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const users = req.body.users;

  const db = req.app.get('squadDbStore');

  try {
    await db
      .addSquadUsersByEmail(squadId, users)
      .then(async (created: any) => {
        if (created) {
          for (const user of created.users) {
            await send({ to: user.email, subject: 'invite', message: `oii ${user.name}` }).catch((error: any) => {
              return next(error);
            });
          }
        }
        return res.sendStatus(201);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function delUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const users = req.body.users;

  const db = req.app.get('squadDbStore');

  try {
    await db
      .delSquadUsersByEmail(squadId, users)
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

export { create, list, del, update, addUsers, delUsers };
