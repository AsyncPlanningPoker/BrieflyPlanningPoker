import prisma from '@briefly/prisma';
import { type ZodiosRequestHandler } from '@zodios/express';
import type { Method, ZodiosPathsByMethod } from '@zodios/core';
import { tasksAPI, type TasksAPI } from '@briefly/apidef';
import context, { type Context } from '../context'
import { mustAuth } from '../middlewares/authorization';
import * as sse from 'sse';

type TasksHandler<M extends Method, Path extends ZodiosPathsByMethod<TasksAPI, M>> =
  ZodiosRequestHandler<TasksAPI, Context, M, Path>;

const tasksRouter = context.router(tasksAPI);

const find: TasksHandler<"get", "/:taskId"> = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await prisma.task.findUniqueOrThrow({
      where: { id: taskId },
      include: {
        messages: true,
        votes: true
      }
    });
    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const deactivate: TasksHandler<"put", "/:taskId"> = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { active: false },
      include: {
        messages: true,
        votes: true
      }
    });

    const channel = sse.getChannel(task.squadId);
    if(channel) channel.broadcast(task, "taskUpdated");

    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const del: TasksHandler<"delete", "/:taskId"> = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
      include: {
        messages: true,
        votes: true
      }
    });
    return res.status(200).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const vote: TasksHandler<"post", "/:taskId/votes"> = async (req, res, next) => {
  const { taskId } = req.params;
  const { email } = req.user;
  const { points } = req.body;
  try {
    const task = await prisma.task.vote(taskId, email, points);

    const channel = sse.getChannel(task.squadId);
    if(channel) channel.broadcast(task, "taskUpdated");

    return res.status(201).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

const message: TasksHandler<"post", "/:taskId/messages"> = async (req, res, next) => {

  const { taskId } = req.params;
  const { email } = req.user;
  const { message } = req.body;
  try {
    const task = await prisma.task.comment(taskId, email, message);

    const channel = sse.getChannel(task.squadId);
    if(channel) channel.broadcast(task, "taskUpdated");

    return res.status(201).json(task);
  } catch (error: unknown) {
    next(error);
  }
};

tasksRouter.use(mustAuth);
tasksRouter.get("/:taskId", find);
tasksRouter.put("/:taskId", deactivate);
tasksRouter.delete("/:taskId", del);
tasksRouter.post("/:taskId/votes", vote);
tasksRouter.post("/:taskId/messages", message);

export default tasksRouter;