import { prisma, squads } from '@briefly/prisma';
import context, { type Context } from '../context'
import { type ZodiosRequestHandler, zodiosRouter } from '@zodios/express';
import { type ZodiosPathsByMethod } from '@zodios/core';
import { type Method } from './utils';
import { SquadsAPI } from '@briefly/prisma/dist/apiDef/squads';


type SquadsHandler<M extends Method, Path extends ZodiosPathsByMethod<SquadsAPI, M>> =
  ZodiosRequestHandler<SquadsAPI, Context, M, Path>;

const create: SquadsHandler<"post", ""> = async (req, res, next) => {
  try {
    const data = req.body;
    const squad = await prisma.squad.create({data});
    return res.status(201).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const find: SquadsHandler<"get", "/:squadId"> = async (req, res, next) => {
  const id = req.params.squadId as string;

  try {
    const squad = await prisma.squad
      .findUniqueOrThrow({
        where: { id },
        include: {
          users: { select: { user: { select: {
            email: true,
            name: true,
            enabled: true,
            createdAt: true,
            updatedAt: true
          }}}},
          tasks: true
        }
      });
      return res.status(200).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const findAll: SquadsHandler<"get", ""> = (req, res, next) => {
  if 
  const email = req.user.email;
  try {
    return await prisma.squad
      .findMany({
        where: {
          users: {
            some: {
              user: { email },
            },
          },
        },
        include: {
          tasks: {
            select: { id: true, name: true, points: true },
          },
        },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

const update: SquadsHandler = (req, res, next) => {
  const id: string = req.params.squadId as string;

  try {
    const data = squads.updateSchema.parse(req.body);
    return await prisma.squad
      .update({
        where: { id },
        data,
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

const addUsers: SquadsHandler = (req, res, next) => {
  const id: string = req.params.squadId as string;

  try {
    const { email, owner } = squads.addUsersSchema.parse(req.body);
    return await prisma.squad
      .update({
        where: { id },
        data: {
          users: {
            create: {
              user: {
                connect: { email },
              },
              enabled: owner,
            },
          },
        },
      })
      .then((obj) => res.status(201).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

const delUsers: SquadsHandler = (req, res, next) => {
  const squadId: string = req.params.squadId as string;
  const email: string = req.query.email as string;

  try {
    const userId = (
      await prisma.user.findUniqueOrThrow({
        where: { email },
        select: { id: true },
      })
    ).id;

    const obj = await prisma.usersOnSquads.delete({
      // eslint-disable-next-line camelcase
      where: { userId_squadId: { userId, squadId } },
    });

    return res.status(200).json(obj);
  } catch (error: unknown) {
    next(error);
  }
}

export { create, find, findAll, update, addUsers, delUsers };
