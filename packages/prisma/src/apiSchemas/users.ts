import { UserSchema, UserOptionalDefaultsSchema } from "../generated/zod";
import { z } from "zod";

/** Esquema para endpoint de criacao - request */
export const createSchemaReq = UserOptionalDefaultsSchema.strict();

/** Esquema para endpoint de criacao - response */
export const createSchemaRes = UserSchema.strict();

/** Esquema para endpoint de login - request */
export const loginSchemaReq = UserOptionalDefaultsSchema.pick({ email: true, password: true }).strict();

/** Esquema para endpoint de login - response */
export const loginSchemaRes = z.object({ token: z.string() }).strict();

/** 
 * Esquema para endpoint de exclusao - request 
 * 
 * Nao sei se precisa...
 */
export const deleteSchemaReq = z.object({}).strict();

/** Esquema para endpoint de exclusao - response */
export const deleteSchemaRes = createSchemaRes;

/** Esquema para endpoint de atualizacao - request */
export const updateSchemaReq = UserOptionalDefaultsSchema.extend({oldPassword: z.string()}).partial().strict();

/** Esquema para endpoint de atualizacao - request */
export const updateSchemaRes = createSchemaRes;

// Tipos

export type CreateSchemaReq = typeof createSchemaReq;
export type CreateSchemaRes = typeof createSchemaRes;
export type LoginSchemaReq = typeof loginSchemaReq;
export type LoginSchemaRes = typeof loginSchemaRes;
export type DeleteSchemaReq = typeof deleteSchemaReq;
export type DeleteSchemaRes = typeof deleteSchemaRes;
export type UpdateSchemaReq = typeof updateSchemaReq;
export type UpdateSchemaRes = typeof updateSchemaRes;

