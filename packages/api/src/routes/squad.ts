import { CustomError } from '../middlewares/error/error';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import send from '../services/email';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squad = {
    id: randomUUID(),
    name: req.body.name,
    users: req.body.users.map((res: any) => {
      return { squadsUsersId: randomUUID(), id: res.id };
    }),
    currentMaxRounds: req.body.currentMaxRounds,
    currentPercentual: req.body.currentPercentual,
  };

  const db = req.app.get('squadDbStore');

  try {
    await db
      .create(squad)
      .then(async (result: any) => {
        for (const user of result.users) {
          await send({ to: user.email, subject: 'invite', message: `oii ${user.name}` }).catch((error: any) => {
            return next(error);
          });
        }

        return res.status(201).json({ id: result.id });
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function list(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const userId = req.params.userId;
  const db = req.app.get('squadDbStore');

  try {
    await db
      .list(userId)
      .then(async (result: any) => {
        return res.status(201).json(result);
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
      .delete(squadId, { updatedAt: new Date() })
      .then(() => {
        return res.status(201);
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
    updateAt: new Date(),
  };

  const db = req.app.get('squadDbStore');

  try {
    await db
      .updateById(squadId, squad)
      .then(() => {
        return res.status(201);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function addMembers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const members = req.body.users.map((user: any) => {
    return {
      userId: user.id,
      squadsUsersId: randomUUID(),
      updateAt: new Date(),
    };
  });

  const db = req.app.get('squadDbStore');

  try {
    await db
      .createSquadsUsersById(squadId, members)
      .then(async (result: any) => {
        for (const user of result.users) {
          await send({ to: user.email, subject: 'invite', message: `oii ${user.name}` }).catch((error: any) => {
            return next(error);
          });
        }
        return res.status(201);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function deleteMembers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId = req.params.squadId;
  const members = req.body.users.map((user: any) => {
    return {
      userId: user.id,
      updateAt: new Date(),
    };
  });

  const db = req.app.get('squadDbStore');

  try {
    await db
      .deleteSquadUsersById(squadId, members)
      .then(() => {
        return res.status(201);
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

export { create, list, del, update, addMembers, deleteMembers };
