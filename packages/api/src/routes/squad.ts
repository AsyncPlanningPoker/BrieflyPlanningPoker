import prisma from '@briefly/prisma';
import context, { type Context } from '../context'
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import { squadsAPI, type SquadsAPI } from '@briefly/apidef';
import { mustAuth } from '../middlewares/authorization';

type SquadsHandler<M extends Method, Path extends ZodiosPathsByMethod<SquadsAPI, M>> =
  ZodiosRequestHandler<SquadsAPI, Context, M, Path>;

const squadsRouter = context.router(squadsAPI);

const create: SquadsHandler<"post", ""> = async (req, res, next) => {
  const data = req.body;

  try {
    const squad = await prisma.squad.create({
      data,
      include: {
        users: { select: { user: true }},
        tasks: true
      }
    });
    return res.status(201).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const find: SquadsHandler<"get", "/:squadId"> = async (req, res, next) => {
  const id = req.params.squadId;

  try {
    const squad = await prisma.squad
      .findUniqueOrThrow({
        where: { id },
        include: {
          users: { select: { user: true }},
          tasks: true
        }
      });
      return res.status(200).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const findAll: SquadsHandler<"get", ""> = async(req, res, next) => {
  const { email } = req.user;

  try {
    const squads = await prisma.squad
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
      });
      return res.status(200).json(squads);
  } catch (error: unknown) {
    next(error);
  }
}

const update: SquadsHandler<"put", "/:squadId"> = async(req, res, next) => {
  const id = req.params.squadId;

  try {
    const data = req.body;
    const squad = await prisma.squad
      .update({
        where: { id },
        data,
        include: {
          users: { select: { user: true }},
          tasks: true
        }
      })
    return res.status(200).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const addUsers: SquadsHandler<"post", "/:squadId/users"> = async (req, res, next) => {
  const id = req.params.squadId;

  try {
    const { email, owner } = req.body;
    const squad =  await prisma.squad
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
        include: {
          users: { select: { user: true }},
          tasks: true
        }
      });
    return res.status(201).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const delUsers: SquadsHandler<"delete", "/:squadId/users"> = async (req, res, next) => {
  const { squadId } = req.params;
  const { email } = req.query;

  try {
    const squad = await prisma.squad.update({
      where: { id: squadId },
      data: { users: { disconnect: { userEmail_squadId: { userEmail: email, squadId }}}},
      include: {
        users: { select: { user: true }},
        tasks: true
      }
    })

    return res.status(200).json(squad);
  } catch (error: unknown) {
    next(error);
  }
}

const createTask: SquadsHandler<"post", "/:squadId/tasks"> = async (req, res, next) => {
  const { squadId } = req.params;
  const data = {...req.body, squadId};
  try {
    const task = await prisma.$transaction(async (tx) => {
      const task = await tx.task.create({ data });
      
      await tx.squad.update({
        where: { id: squadId },
        data: { tasks: { connect: { id: task.id }}},
        include: {
          users: { select: { user: true }},
          tasks: true
        }
      });
      return task;
    });
    return res.status(201).json(task)
  } catch(error: unknown){
    next(error);
  }
};

squadsRouter.use(mustAuth);
squadsRouter.post("", create);
squadsRouter.get("", findAll);
squadsRouter.get("/:squadId", find);
squadsRouter.put("/:squadId", update);
squadsRouter.post("/:squadId/users", addUsers);
squadsRouter.delete("/:squadId/users", delUsers);
squadsRouter.post("/:squadId/tasks", createTask);

export default squadsRouter;
