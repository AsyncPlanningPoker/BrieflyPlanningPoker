import { NextFunction, Request, Response } from 'express';
import * as auth from '../utils/authorization';
import { CustomError, Unauthorized } from '../utils/error';
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

    if (!user) {
      throw new Unauthorized('The email provided is not connected to an account');
    } else {
      const passwordMatch = await crypt.compare(req.body.password, user.password);

      if (passwordMatch) {
        return res.status(200).json({ token: auth.create(db.id) });
      } else {
        throw new Unauthorized('Wrong password');
      }
    }
  } catch (error: any) {
    next(error);
  }
}

export { create, login };
