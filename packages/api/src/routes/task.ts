import { NextFunction, Response } from 'express';
import { prisma, tasks } from 'myprisma';
import { squadReqType, taskReqType } from './utils';

async function findAll(req: squadReqType, res: Response, next: NextFunction): Promise<Response | void> {
  const squadId: string = req.params.squadId;
  try {
    return await prisma.task
      .findMany({
        where: { squadId },
        select: { id: true, name: true, points: true },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function create(req: squadReqType, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const data = tasks.createSchema.parse({
      ...req.body,
      squadId: req.params.squadId,
    });
    return await prisma.task
      .create({
        data,
      })
      .then((obj) => res.status(201).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function find(req: taskReqType, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    return await prisma.task
      .findUniqueOrThrow({
        where: { id: req.params.taskId },
        include: {
          votes: {
            select: {
              user: {
                select: { email: true },
              },
              points: true,
              round: true,
              createdAt: true,
            },
          },
          messages: {
            select: {
              user: {
                select: { email: true },
              },
              message: true,
              round: true,
              createdAt: true,
            },
          },
        },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function deactivate(req: taskReqType, res: Response, next: NextFunction): Promise<Response | void> {
  const id: string = req.params.taskId;
  try {
    return await prisma.task
      .update({
        where: { id },
        data: { active: false, finished: true },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function deleteTask(req: taskReqType, res: Response, next: NextFunction): Promise<Response | void> {
  const id: string = req.params.taskId;
  try {
    return await prisma.task
      .delete({
        where: { id },
      })
      .then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

export { create, deactivate, deleteTask, find, findAll };
