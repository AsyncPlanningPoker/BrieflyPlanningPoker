import { NextFunction, Request, Response } from 'express';
import { prisma, SquadOptionalDefaultsSchema, SquadPartialSchema } from 'myprisma';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

async function create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const data = SquadOptionalDefaultsSchema.strict().parse(req.body);
    return prisma.squad
      .create({
        data,
      })
      .then((obj) => res.status(201).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function find(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id: string = req.params.squadId as string;

  try {
    return await prisma.squad
      .findUniqueOrThrow({
        where: { id },
        include: { users: true, tasks: true },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const email: string = req.query.user as string;
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
        include: { tasks: true },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id: string = req.params.squadId as string;

  try {
    const data = SquadPartialSchema.strict().parse(req.body);
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

const addUsersSchema = z.object({
  email: z.string().email(),
  owner: z.boolean(),
});

async function addUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const id: string = req.params.squadId as string;

  try {
    const { email, owner } = addUsersSchema.parse(req.body);
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

async function delUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
      where: { userId_squadId: { userId, squadId } },
    });

    return res.status(200).json(obj);
  } catch (error: unknown) {
    next(error);
  }
}

export { create, find, findAll, update, addUsers, delUsers };
