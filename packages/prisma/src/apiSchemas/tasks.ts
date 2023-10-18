import { z } from "zod";
import { TaskOptionalDefaultsSchema, TaskSchema } from "../generated/zod";


/** Esquema para criacao de uma task - request */
export const createSchemaReq = TaskOptionalDefaultsSchema.strict();

/** Esquema para criacao de uma task - response */
export const createSchemaRes = TaskSchema.strict();

/**
 * Esquema para listar uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const findSchemaReq = z.object({}).strict();

/** Esquema para listar uma task - response */
export const findSchemaRes = createSchemaRes;

/**
 * Esquema para listar todas as tasks de uma squad - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const findAllSchemaReq = z.object({}).strict();

/** Esquema para listar todas as tasks - response */
export const findAllSchemaRes = z.array(findSchemaRes);

/**
 * Esquema para desativar uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const deactivateSchemaReq = z.object({}).strict();

/** Esquema para desativar uma task - response */
export const deactivateSchemaRes = createSchemaRes;

/**
 * Esquema para excluir uma task - request **(vazio)**
 * 
 * Nao sei se precisa...*/
export const deleteSchemaReq = z.object({}).strict();

/** Esquema para excluir uma task - response */
export const deleteSchemaRes = createSchemaRes;

// Tipos
export type CreateSchemaReq = z.infer<typeof createSchemaReq>;
export type CreateSchemaRes = z.infer<typeof createSchemaRes>;
export type FindSchemaReq = z.infer<typeof findSchemaReq>;
export type FindSchemaRes = z.infer<typeof findSchemaRes>;
export type FindAllSchemaReq = z.infer<typeof findAllSchemaReq>;
export type FindAllSchemaRes = z.infer<typeof findAllSchemaRes>;
export type DeactivateSchemaReq = z.infer<typeof deactivateSchemaReq>;
export type DeactivateSchemaRes = z.infer<typeof deactivateSchemaRes>;
export type DeleteSchemaReq = z.infer<typeof deleteSchemaReq>;
export type DeleteSchemaRes = z.infer<typeof deleteSchemaRes>;