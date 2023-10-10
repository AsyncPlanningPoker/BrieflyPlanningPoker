import { Request } from 'express';

export type squadReqType = Request<{ squadId: string }>;
export type taskReqType = Request<{ taskId: string }>;
