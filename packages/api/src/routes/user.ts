import { CustomError, Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
import { NextFunction, Request, Response } from 'express';
import * as crypt from '../utils/crypt';
import { randomUUID } from 'crypto';
import send from '../services/email';

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
        return res.status(201).json({ token: auth.create(db.id, 'login') });
      })
      .catch(({ message }: any) => {
        throw new CustomError(message);
      });
  } catch (error: any) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = req.body.email;
  const db = req.app.get('userDbStore');

  try {
    const user = await db.findByEmail(email);

    if (user) {
      const passwordMatch = await crypt.compare(req.body.password, user.password);

      if (passwordMatch) {
        return res.status(200).json({ token: auth.create(db.id, 'login') });
      }
    }

    throw new Unauthorized('invalid credentials');
  } catch (error: any) {
    next(error);
  }
}

async function passRecovery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = req.body.email;
  const db = req.app.get('userDbStore');
  const user = await db.findByEmail(email);
  const token = user ? auth.create(email, 'pass-recovery', 300) : auth.create('inexistentAccount', 'inexistentAccount', 0);

  await send({ to: email, subject: 'password recovery', message: `${req.body.url}${token}` })
    .then(() => {
      return res.status(200).json({});
    })
    .catch((error: any) => {
      return next(error);
    });
}

async function passUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const password = await crypt.create(req.body.password);
  const token = req.body.token;
  const db = req.app.get('userDbStore');
  const verify = auth.verify(token.replace('Bearer', '').trim());

  try {
    if (verify?.role === 'pass-recovery') {
      await db.updatePassByEmail(verify.user, { password: password, updatedAt: new Date() });
    } else {
      throw new Unauthorized('your link is invalid or has expired');
    }
  } catch (error: any) {
    next(error);
  }
}

export { create, login, passRecovery, passUpdate };
