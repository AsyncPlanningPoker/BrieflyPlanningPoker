import { z } from "zod";
import { VoteSchema, MessageSchema, TaskSchema } from "../generated/zod";


/** Esquema para realizacao de um voto em uma task - request */
export const voteSchemaReq = VoteSchema.pick({ points: true }).strict();

/** Esquema para realizacao de um voto em uma task - response */
export const voteSchemaRes = TaskSchema.extend({
    votes: z.array(VoteSchema.omit({taskId: true})),
    messages: z.array(MessageSchema.omit({taskId: true, id: true}))
}).strict();

/** Esquema para realizacao de um comentario em uma task - request */
export const messageSchemaReq = MessageSchema.pick({ message: true }).strict();

/** Esquema para realizacao de um voto em uma task - response */
export const messageSchemaRes = voteSchemaRes;


// Tipos
export type VoteSchemaReq = z.infer<typeof voteSchemaReq>;
export type VoteSchemaRes = z.infer<typeof voteSchemaRes>;
export type MessageSchemaReq = z.infer<typeof messageSchemaReq>;
export type MessageSchemaRes = z.infer<typeof messageSchemaRes>;