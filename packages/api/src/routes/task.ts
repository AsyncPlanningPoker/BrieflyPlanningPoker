import { prisma, tasks } from '@briefly/prisma';
import context, { type Context } from '../context'
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import tasksAPI, { type TasksAPI } from '@briefly/prisma/dist/apiDef/tasks';
import { Unauthorized } from 'middlewares/error';

type TasksHandler<M extends Method, Path extends ZodiosPathsByMethod<TasksAPI, M>> =
  ZodiosRequestHandler<TasksAPI, Context, M, Path>;

const tasksRouter = context.router(tasksAPI);

const find: TasksHandler<"get", "/:taskId"> = async (req, res, next) => {
  const taskId: string = req.params.taskId as string;
  try {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const deactivate: TasksHandler<"put", "/:taskId"> = async (req, res, next) => {
  const taskId: string = req.params.taskId as string;
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { active: false }
    });
    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const del: TasksHandler<"delete", "/:taskId"> = async (req, res, next) => {
  const taskId: string = req.params.taskId as string;
  try {
    const task = await prisma.task.delete({ where: { id: taskId } });
    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const vote: TasksHandler<"post", "/:taskId/votes"> = async (req, res, next) => {
  if(! req.user)
    throw new Unauthorized("You must be logged in to do this action!");

  const taskId: string = req.params.taskId as string;
  const email = req.user.email;
  const { points } = req.body;
  try {
    const task = await prisma.task.vote(taskId, email, points);
    return res.status(201).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const message: TasksHandler<"post", "/:taskId/messages"> = async (req, res, next) => {
  if(! req.user)
    throw new Unauthorized("You must be logged in to do this action!");

  const taskId: string = req.params.taskId as string;
  const email = req.user.email;
  const { message } = req.body;
  try {
    const task = await prisma.task.comment(taskId, email, message);
    return res.status(201).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

tasksRouter.get("/:taskId", find);
tasksRouter.put("/:taskId", deactivate);
tasksRouter.delete("/:taskId", del);
tasksRouter.post("/:taskId/votes", vote);
tasksRouter.post("/:taskId/messages", message);

export default tasksRouter;