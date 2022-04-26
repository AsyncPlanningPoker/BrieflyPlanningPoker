import { CustomError, Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
import { NextFunction, Request, Response } from 'express';
import * as crypt from '../utils/crypt';
import { randomUUID } from 'crypto';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const user = {
    id: randomUUID(),
    name: req.body.name,
    email: req.body.email,
    password: await crypt.create(req.body.password),
  };

  const db = req.app.get('userDbStore');
  try {
    await db
      .create(user)
      .then(() => {
        return res.status(201).json({ token: auth.create(db.id) });
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const credentials = {
    email: req.body.email,
  };

  const db = req.app.get('userDbStore');

  try {
    const user = await db.findByCredentials(credentials);

    if (user) {
      const passwordMatch = await crypt.compare(req.body.password, user.password);

      if (passwordMatch) {
        return res.status(200).json({ token: auth.create(db.id) });
      }
    }

    throw new Unauthorized('invalid credentials');
  } catch (error: any) {
    next(error);
  }
}

export { create, login };
