import { z } from "zod";
import { TaskOptionalDefaultsSchema, TaskSchema, VoteSchema, MessageSchema } from "../generated/zod";

/**
 * Esquema para listar uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const findSchemaReq = z.object({}).strict();

/** Esquema para listar uma task - response */
export const findSchemaRes = TaskSchema.extend({
    votes: z.array(VoteSchema.omit({taskId: true})),
    messages: z.array(MessageSchema.omit({taskId: true, id: true}))
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