import { UserSchema, UserOptionalDefaultsSchema, UserPartialSchema } from "../generated/zod";
import { schemaAndExtraArgs } from "../utils";
import { z } from "zod";

/** Esquema para endpoint de criacao */
export const createSchema = UserOptionalDefaultsSchema.strict();

/** Esquema para endpoint de login */
export const loginSchema = UserOptionalDefaultsSchema
    .pick({ email: true, password: true }).strict();

/** 
 * Esquema para endpoint de exclusao
 * 
 * Nao sei se precisa...
 */
export const deleteSchema = z.object({}).strict();

/** Esquema para endpoint de criacao */
export const updateSchema = schemaAndExtraArgs(
    UserPartialSchema,
    z.object({
      oldPassword: UserSchema.shape.password.optional(),
    }));

