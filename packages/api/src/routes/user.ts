import { Unauthorized } from '../middlewares/error/error';
import * as auth from '../middlewares/authorization/authorization';
// import send from '../services/email';
import { prisma, users as usersSchemas } from '@briefly/prisma';
import usersAPI, { type UsersAPI } from '@briefly/prisma/dist/apiDef/users';
import context, { type Context } from '../context'
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import { mustAuth } from 'middlewares/authorization';

type UsersHandler<M extends Method, Path extends ZodiosPathsByMethod<UsersAPI, M>> =
  ZodiosRequestHandler<UsersAPI, Context, M, Path>;

const usersRouter = context.router(usersAPI);

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
    const data = req.body;
    const { email } = req.user;

    if (data.password) {
      if (! data.oldPassword) {
        throw new Unauthorized('Must supply current password');
      }
      if (! await prisma.user.authenticate(email, data.oldPassword))
        throw new Unauthorized('Wrong password');
    }
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
