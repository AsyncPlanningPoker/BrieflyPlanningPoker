import { CustomError } from '../middlewares/error/error';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const squad = {
    id: randomUUID(),
    name: req.body.name,
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

async function find(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { squadId } = req.params;
  const db = req.app.get('squadDbStore');

  try {
    await db
      .find(squadId)
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

async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const db = req.app.get('squadDbStore');
  const { user } = req.query;

  try {
    await db
      .findAll(user)
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
  const { email, owner } = req.body;

  const db = req.app.get('squadDbStore');

  try {
    await db
      .addSquadUsersByEmail(squadId, email, owner)
      .then(async (created: any) => {
        // if (created) {
        //     if(!owner){
        //       await send({ to: created.email, subject: 'invite', message: `${created.name}` }).catch((error: any) => {
        //         return next(error);
        //       });
        //     }
        //   }
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
  const email = req.query.email;

  const db = req.app.get('squadDbStore');

  try {
    await db
      .delSquadUserByEmail(squadId, email)
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

export { create, find, findAll, update, addUsers, delUsers };
