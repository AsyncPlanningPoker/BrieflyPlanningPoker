import { z } from "zod";
import { findSchemaRes as findTaskSchemaRes } from "./tasks";
import { SquadOptionalDefaultsSchema, SquadPartialSchema, SquadSchema, TaskOptionalDefaultsSchema, TaskSchema } from "../generated/zod";
import { updateSchemaRes as userSchema } from "./users";

/** Esquema para criacao de squads - request */
export const createSchemaReq = SquadOptionalDefaultsSchema.omit({ id: true, enabled: true, createdAt: true, updatedAt: true }).strict();

/** Esquema para criacao de squads - response */
export const createSchemaRes = SquadSchema.extend({
    users: z.array(z.object({ user: userSchema }))
}).strict();

/**
 * Esquema para listar squads - request **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findSchemaReq = z.object({}).strict();

/** Esquema para listar uma squad - response */
export const findSchemaRes = createSchemaRes;

/**
 * Esquema para listar todos os squads - request **(vazio)**
 * 
 * Não sei se precisa...
 */
export const findAllSchemaReq = z.object({}).strict();

/** Esquema para listar squads - response */
export const findAllSchemaRes = z.array(createSchemaRes.omit({ users: true }));

/** Esquema para update de squads - request */
export const updateSchemaReq = SquadPartialSchema.strict();

/** Esquema para update de squads - response */
export const updateSchemaRes = createSchemaRes;

/** Esquema para adicionar um usuario a uma squad - request */
export const addUsersSchemaReq = z.object({ email: z.string().email(), owner: z.boolean().default(false) }).strict();

/** Esquema para adicionar um usuario a uma squad - response */
export const addUsersSchemaRes = createSchemaRes;

/**
 * Esquema para sair de um squad - request**(vazio)**
 * 
 * Não sei se precisa...
 */
export const delUsersSchemaReq = z.object({}).strict();

/** Esquema para sair de um squad - response */
export const delUsersSchemaRes = createSchemaRes;

/** Esquema para criacao de uma task - request */
export const createTaskSchemaReq = TaskOptionalDefaultsSchema.pick({
    name: true,
    description: true,
    maxRounds: true,
    percentual: true
}).strict();

/** Esquema para criacao de uma task - response */
export const createTaskSchemaRes = TaskSchema.strict();

/** Esquema para listar tasks de uma squad - response */
export const listTasksSchemaRes = z.array(createTaskSchemaRes);

// Tipos
export type CreateSchemaReq = z.infer<typeof createSchemaReq>;
export type CreateSchemaRes = z.infer<typeof createSchemaRes>;
export type FindSchemaReq = z.infer<typeof findSchemaReq>;
export type FindSchemaRes = z.infer<typeof findSchemaRes>;
export type FindAllSchemaReq = z.infer<typeof findAllSchemaReq>;
export type FindAllSchemaRes = z.infer<typeof findAllSchemaRes>;
export type UpdateSchemaReq = z.infer<typeof updateSchemaReq>;
export type UpdateSchemaRes = z.infer<typeof updateSchemaRes>;
export type AddUsersSchemaReq = z.infer<typeof addUsersSchemaReq>;
export type AddUsersSchemaRes = z.infer<typeof addUsersSchemaRes>;
export type DelUsersSchemaReq = z.infer<typeof delUsersSchemaReq>;
export type DelUsersSchemaRes = z.infer<typeof delUsersSchemaRes>;
export type CreateTaskSchemaReq = z.infer<typeof createTaskSchemaReq>;
export type CreateTaskSchemaRes = z.infer<typeof createTaskSchemaRes>;
export type ListTasksSchemaRes = z.infer<typeof listTasksSchemaRes>;