import { Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
// import send from '../services/email';
import { prisma, users as usersSchemas } from '@briefly/prisma';
import usersAPI, { type UsersAPI } from '@briefly/prisma/dist/apiDef/users';
import context, { type Context } from '../context'
import { type ZodiosRequestHandler, zodiosRouter } from '@zodios/express';
import { type ZodiosPathsByMethod } from '@zodios/core';
import { type Method } from './utils';

type cu = UsersAPI[2]["parameters"]

type UsersHandler<M extends Method, Path extends ZodiosPathsByMethod<UsersAPI, M>> =
  ZodiosRequestHandler<UsersAPI, Context, M, Path>;

type cuceta = Parameters<ZodiosRequestHandler<UsersAPI, Context, "put", "">>[0]["body"];
type aicaralho = UsersAPI[2]["parameters"]

const usersRouter = zodiosRouter(usersAPI, { context });

const create: UsersHandler<"post", ""> = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await prisma.user.create({ data });
    return res.status(201).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

const login: UsersHandler<"post", "/login"> = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (await prisma.user.authenticate(email, password))
      return res.status(200).json({ token: auth.create(email, 'login') });
    
    throw new Unauthorized('Invalid credentials');
  } catch (error: unknown) {
    next(error);
  }
};

const update: UsersHandler<"put", ""> = async (req, res, next) => {
  try {
    if(! req.user)
      throw new Unauthorized("You must be logged in to do this action!");
    
    const data = req.body;
    const oldEmail = req.user.email;

    if (data.password) {
      if (! extraArgs.oldPassword) {
        throw new Unauthorized('Must supply current password');
      }
      if (! await prisma.user.authenticate(oldEmail, extraArgs.oldPassword))
        throw new Unauthorized('Wrong password');
    }
    const user = await prisma.user
    .update({
      data,
      where: { email: oldEmail }
    });
  return res.status(200).json(user);
} catch (error: unknown) {
  next(error);
}
};

const del: UsersHandler<"delete", ""> = async (req, res, next) => {
  try {
    if(! req.user)
      throw new Unauthorized("You must be logged in to do this action!");
    const email: string = req.user.email
    return await prisma.user
      .delete({
        where: { email },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
};

usersRouter.post("", create);
usersRouter.put("", update);
usersRouter.delete("", del);
usersRouter.post("/login", login);

export { usersRouter };

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
// export { create, login, passRecovery, passUpdate, updateUser, deleteUser };
