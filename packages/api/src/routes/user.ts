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
        return res.status(201).json({ token: auth.create(user.email, 'login') });
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
        return res.status(200).json({ token: auth.create(email, 'login') });
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
  return res.status(200).json({});
  // await send({ to: email, subject: 'password recovery', message: `${req.body.url}${token}` })
    // .then(() => {
    //   return res.status(200).json({});
    // })
    // .catch((error: any) => {
    //   return next(error);
    // });
}

async function passUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const password = await crypt.create(req.body.password);
  const token = req.body.token;
  const db = req.app.get('userDbStore');
  const verify = auth.verify(token.replace('Bearer', '').trim());

  try {
    if (verify?.role === 'pass-recovery') {
      await db.updatePassByEmail(verify.user, { password: password, updatedAt: new Date() });
      return res.sendStatus(200);
    } else {
      throw new Unauthorized('your link is invalid or has expired');
    }
  } catch (error: any) {
    next(error);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const token = req.body.token;
  const db = req.app.get('userDbStore');
  const verify = auth.verify(token.replace('Bearer', '').trim());

  try {
    if (verify?.role === 'login') {
      await db.deleteByEmail(verify.user, { updatedAt: new Date() });
      return res.sendStatus(200);
    } else {
      throw new Unauthorized('your link is invalid or has expired');
    }
  } catch (error: any) {
    next(error);
  }
}

async function nameAndPassUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const token = req.body.token;
  const db = req.app.get('userDbStore');
  const verify = auth.verify(token.replace('Bearer', '').trim());

  try {

    let dataUpdate: any = { updatedAt: new Date() };
    req.body.name ? dataUpdate.name = req.body.name : null;

    const oldPassword = req.body.oldpassword ? req.body.oldpassword : null;
    if(oldPassword) {
      const user = await db.findByEmail(verify.user);

      if (user) {
        const passwordMatch = await crypt.compare(oldPassword, user.password);

        if (passwordMatch) {
          dataUpdate.password = await crypt.create(req.body.password);
          await db.updatePassByEmail(verify.user, dataUpdate);
          return res.sendStatus(200);
        } else {
          throw new Unauthorized ('The password did not match.');
        }
      }
    } else if(dataUpdate.name) {
      await db.updatePassByEmail(verify.user, dataUpdate);
      return res.sendStatus(200);
    } else {
      return res.status(400).json({ message: 'Missing values.' });
    }

  } catch(error:any){
    next(error);
  }
  

}

export { create, login, passRecovery, passUpdate, nameAndPassUpdate, deleteUser};
