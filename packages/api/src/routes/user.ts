// import send from '../services/email';
import prisma from '@briefly/prisma';
import { usersAPI, type UsersAPI } from '@briefly/apidef';
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import { Unauthorized } from '../middlewares/error/error';
import { mustAuth } from '../middlewares/authorization';
import context, { type Context } from '../context'
import * as auth from '../middlewares/authorization/authorization';

type UsersHandler<M extends Method, Path extends ZodiosPathsByMethod<UsersAPI, M>> =
  ZodiosRequestHandler<UsersAPI, Context, M, Path>;

const usersRouter = context.router(usersAPI);

const create: UsersHandler<"post", ""> = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await prisma.user.create({ data });
    return res.status(201).json({ token: auth.create(data.email, 'login') });
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
    const data = req.body;
    const { email } = req.user;

    if (data.password) {
      if (! data.oldPassword) {
        throw new Unauthorized('Must supply current password');
      }
      if (! await prisma.user.authenticate(email, data.oldPassword))
        throw new Unauthorized('Wrong password');

    }

    if(data.oldPassword)
      delete data.oldPassword;

    const user = await prisma.user
    .update({
      data,
      where: { email }
    });
  return res.status(200).json(user);
} catch (error: unknown) {
  next(error);
}
};

const del: UsersHandler<"delete", ""> = async (req, res, next) => {
  try {
    const { email } = req.user
    const user = await prisma.user
      .delete({
        where: { email },
      })
    return res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

usersRouter.post("", create);
usersRouter.put("", mustAuth, update);
usersRouter.delete("", mustAuth, del);
usersRouter.post("/login", login);

export default usersRouter;

async function passRecovery(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email = req.body.email;
  const db = req.app.get('userDbStore');
  const user = await db.findByEmail(email);
  const token = user ? auth.create(email, 'pass-recovery', 300) : auth.create('inexistentAccount', 'inexistentAccount', 0);
  const url = process.env.URL;
  const newUrl = `${url}/confirm_reset?token=${token}`;
  
  await send({ 
      to: email, 
      subject: 'BRIEFLY - Password Recovery', 
      message: `Hey, did you ask for a password recovery?\n\nThis is your link ${newUrl}` })
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
      return res.sendStatus(200);
    } else {
      throw new Unauthorized('your link is invalid or has expired');
    }
  } catch (error: any) {
    next(error);
  }
}