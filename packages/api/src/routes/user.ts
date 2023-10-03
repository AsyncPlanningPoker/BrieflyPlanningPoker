/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Unauthorized } from '../middlewares/error/error';
// import * as auth from '../middlewares/authorization/authorization';
// import send from '../services/email';
import * as crypt from '../utils/crypt';
import { NextFunction, Request, Response } from 'express';
import { prisma, UserCreateInputSchema } from 'myprisma';
import { ZodError, z } from 'zod';
import { Prisma } from '@prisma/client';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  // throw new Error('Erro caralho');
  // console.error(prisma);
  return await UserCreateInputSchema.transform(async (user) => {
    user.password = await crypt.create(user.password);
    return user;
  })
    .parseAsync(req.body)
    .then((data) => prisma.user.create({ data }))
    .then((obj) => res.status(201).json(obj));
}

// async function passRecovery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const email = req.body.email;
//   const db = req.app.get('userDbStore');
//   const user = await db.findByEmail(email);
//   const token = user ? auth.create(email, 'pass-recovery', 300) : auth.create('inexistentAccount', 'inexistentAccount', 0);
//   await send({ to: email, subject: 'BRIEFLY - Password Recovery', message: `Hey, did you ask for a password recovery?\n\nThis is your link ${req.body.url}${token}` })
//     .then(() => {
//       return res.status(200).json({});
//     })
//     .catch((error: any) => {
//       return next(error);
//     });
// }

// async function passUpdate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const password = await crypt.create(req.body.password);
//   const token = req.body.token;
//   const db = req.app.get('userDbStore');
//   const verify = auth.verify(token.replace('Bearer', '').trim());

//   try {
//     if (verify?.role === 'pass-recovery') {
//       await db.updatePassByEmail(verify.user, { password: password, updatedAt: new Date() });
//       return res.sendStatus(200);
//     } else {
//       throw new Unauthorized('your link is invalid or has expired');
//     }
//   } catch (error: any) {
//     next(error);
//   }
// }

// async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const db = req.app.get('userDbStore');

//   try {
//     await db.deleteByEmail(req.query.user, { updatedAt: new Date() });
//     return res.sendStatus(200);
//   } catch (error: any) {
//     next(error);
//   }
// }

// async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
//   const db = req.app.get('userDbStore');
//   const email = req.query.user;

//   try {
//     const dataUpdate: any = { updatedAt: new Date() };
//     const oldPassword = req.body.oldpassword;
//     const password = req.body.password;
//     const name = req.body.name;

//     if (oldPassword && password) {
//       const user = await db.findByEmail(email);

//       const passwordMatch = await crypt.compare(oldPassword, user.password);
//       if (passwordMatch) {
//         dataUpdate.password = await crypt.create(password);
//       } else {
//         throw new Unauthorized('The password did not match.');
//       }
//     }

//     name ? (dataUpdate.name = name) : {};
//     await db.updatePassByEmail(email, dataUpdate);
//     return res.sendStatus(200);
//   } catch (error: any) {
//     next(error);
//   }
// }

export { create };
// export { create, login, passRecovery, passUpdate, updateUser, deleteUser };
