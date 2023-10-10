import { NextFunction, Request, Response } from 'express';
import { prisma, voting } from '@briefly/prisma';

async function vote(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { points } = voting.voteSchema.parse(req.body);
    const taskId: string = req.params.taskId;
    const email: string = req.query.user as string;

    return await prisma.task.vote(taskId, email, points).then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

async function message(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { message } = voting.messageSchema.parse(req.body);
    const taskId: string = req.params.taskId;
    const email: string = req.query.user as string;

    return await prisma.task.comment(taskId, email, message).then((obj) => res.status(200).json(obj));
  } catch (error: unknown) {
    next(error);
  }
}

export { vote, message };
