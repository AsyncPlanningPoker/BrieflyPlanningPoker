import { z } from "zod";
import { UserSchema, UserOptionalDefaultsSchema } from "../generated/zod";

/** Esquema para endpoint de criacao - request */
export const createSchemaReq = UserOptionalDefaultsSchema
    .omit({
        createdAt: true,
        updatedAt: true
    }).strict();

/** Esquema para endpoint de criacao - response */
export const createSchemaRes = z.object({ token: z.string() }).strict();

/** Esquema para endpoint de login - request */
export const loginSchemaReq = UserOptionalDefaultsSchema.pick({ email: true, password: true }).strict();

/** Esquema para endpoint de login - response */
export const loginSchemaRes = createSchemaRes;

/** Esquema para endpoint de atualizacao - request */
export const updateSchemaReq = UserOptionalDefaultsSchema
    .extend({ oldPassword: z.string() })
    .omit({
        createdAt: true,
        updatedAt: true
    }).partial().strict();

/** Esquema para endpoint de atualizacao - request */
export const updateSchemaRes = UserSchema.omit({ password: true }).strict();

/** 
 * Esquema para endpoint de exclusao - request 
 * 
 * Nao sei se precisa...
 */
export const deleteSchemaReq = z.object({}).strict();

/** Esquema para endpoint de exclusao - response */
export const deleteSchemaRes = updateSchemaRes;


// Tipos

export type CreateSchemaReq = z.infer<typeof createSchemaReq>;
export type CreateSchemaRes = z.infer<typeof createSchemaRes>;
export type LoginSchemaReq = z.infer<typeof loginSchemaReq>;
export type LoginSchemaRes = z.infer<typeof loginSchemaRes>;
export type DeleteSchemaReq = z.infer<typeof deleteSchemaReq>;
export type DeleteSchemaRes = z.infer<typeof deleteSchemaRes>;
export type UpdateSchemaReq = z.infer<typeof updateSchemaReq>;
export type UpdateSchemaRes = z.infer<typeof updateSchemaRes>;

