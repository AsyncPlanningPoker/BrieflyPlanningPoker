import { SquadOptionalDefaultsSchema, SquadPartialSchema, SquadSchema } from "../generated/zod";
import { z } from "zod";

/** Esquema para criacao de squads - request */
export const createSchemaReq = SquadOptionalDefaultsSchema.strict();

/** Esquema para criacao de squads - response */
export const createSchemaRes = SquadSchema.strict();

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
export const findAllSchemaRes = z.array(createSchemaRes);

/** Esquema para update de squads - request */
export const updateSchemaReq = SquadPartialSchema.strict();

/** Esquema para update de squads - response */
export const updateSchemaRes = createSchemaRes;

/** Esquema para adicionar um usuario a uma squad - request */
export const addUsersSchemaReq = z.object({email: z.string().email(),owner: z.boolean()}).strict();

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
