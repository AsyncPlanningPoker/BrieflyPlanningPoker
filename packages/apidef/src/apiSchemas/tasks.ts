import { z } from "zod";
import { TaskSchema, VoteSchema, MessageSchema } from "../generated/zod";

/**
 * Esquema para listar uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const findSchemaReq = z.object({}).strict();

const messageOrVoteSchema = z.object({
    round: z.number().int(),
    user: z.object({ email: z.string().email() }),
    createdAt: z.coerce.date()
});

/** Esquema para listar uma task - response */
export const findSchemaRes = TaskSchema.extend({
    votes: z.array(messageOrVoteSchema.extend({ points: z.number().int() })),
    messages: z.array(messageOrVoteSchema.extend({ message: z.string() }))
}).strict();

/**
 * Esquema para desativar uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const deactivateSchemaReq = z.object({}).strict();

/** Esquema para desativar uma task - response */
export const deactivateSchemaRes = findSchemaRes;

/**
 * Esquema para excluir uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const deleteSchemaReq = z.object({}).strict();

/** Esquema para excluir uma task - response */
export const deleteSchemaRes = findSchemaRes;

/** Esquema para realizacao de um voto em uma task - request */
export const voteSchemaReq = VoteSchema.pick({ points: true }).strict();

/** Esquema para realizacao de um voto em uma task - response */
export const voteSchemaRes = findSchemaRes;

/** Esquema para realizacao de um comentario em uma task - request */
export const messageSchemaReq = MessageSchema.pick({ message: true }).strict();

/** Esquema para realizacao de um voto em uma task - response */
export const messageSchemaRes = findSchemaRes;

// Tipos

export type FindSchemaReq = z.infer<typeof findSchemaReq>;
export type FindSchemaRes = z.infer<typeof findSchemaRes>;
export type DeactivateSchemaReq = z.infer<typeof deactivateSchemaReq>;
export type DeactivateSchemaRes = z.infer<typeof deactivateSchemaRes>;
export type DeleteSchemaReq = z.infer<typeof deleteSchemaReq>;
export type DeleteSchemaRes = z.infer<typeof deleteSchemaRes>;
export type VoteSchemaReq = z.infer<typeof voteSchemaReq>;
export type VoteSchemaRes = z.infer<typeof voteSchemaRes>;
export type MessageSchemaReq = z.infer<typeof messageSchemaReq>;
export type MessageSchemaRes = z.infer<typeof messageSchemaRes>;
export type Vote = FindSchemaRes["votes"][number];
export type Message = FindSchemaRes["messages"][number];

/** Type to represent either a vote or a message in a task */
export type Action = Vote | Message;

/** Type guard */
export function isVote(action: Action): action is Vote{
    return "points" in action;
}

/** Type guard */
export function isMessage(action: Action): action is Message{
    return "message" in action;
}