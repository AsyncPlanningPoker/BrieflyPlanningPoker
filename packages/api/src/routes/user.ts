/* eslint-disable @typescript-eslint/no-unused-vars */
import { Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
// import send from '../services/email';
import * as crypt from '../utils/crypt';
import { NextFunction, Request, Response } from 'express';
import { prisma, User, UserCreateInputSchema, UserSchema, UserUpdateInputSchema } from 'myprisma';

const myUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict();

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    return await UserCreateInputSchema.transform(async (user) => {
      user.password = await crypt.create(user.password);
      return user;
    })
      .parseAsync(req.body)
      .then((data) => prisma.user.create({ data, select: { name: true, email: true } }))
      .then((obj) => res.status(201).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { password, email } = UserSchema.pick({ email: true, password: true }).strict().parse(req.body);
    const realPassword = (
      await prisma.user.findUniqueOrThrow({
        select: { password: true },
        where: { email },
      })
    ).password;
    if (await crypt.compare(password, realPassword)) {
      return res.status(200).json({ token: auth.create(email, 'login') });
    }
    throw new Unauthorized('Invalid credentials');
  } catch (error: unknown) {
    next(error);
  }
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
async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const oldEmail = UserSchema.shape.email.parse(req.body.user);
    delete req.body.user;

    const data = await myUserSchema
      .extend({
        oldPassword: UserSchema.shape.password,
      })
      .partial()
      .transform(async (data) => {
        if (data.password) {
          if (!data.oldPassword) {
            throw new Unauthorized('Must supply old password.');
          }

          const { password } = await prisma.user.findUniqueOrThrow({
            select: { password: true },
            where: { email: oldEmail },
          });

          if (await crypt.compare(data.oldPassword, password)) {
            const pass = await crypt.create(data.password);
            console.error(pass);
            data.password = pass;
          } else {
            throw new Unauthorized('Incorrect password.');
          }
        }
        return data;
      })
      .parseAsync(req.body)
      .catch((e: unknown) => {
        throw e;
      });

    return prisma.user
      .update({
        data,
        where: { email: oldEmail },
        select: {
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((user) => res.status(200).json(user))
      .catch((e: unknown) => {
        throw e;
      });
  } catch (error: unknown) {
    next(error);
  }
}

export { create, login, updateUser };
// export { create, login, passRecovery, passUpdate, updateUser, deleteUser };
