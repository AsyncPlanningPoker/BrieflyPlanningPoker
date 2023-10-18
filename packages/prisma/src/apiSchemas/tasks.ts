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
export type CreateSchemaReq = typeof createSchemaReq;
export type CreateSchemaRes = typeof createSchemaRes;
export type FindSchemaReq = typeof findSchemaReq;
export type FindSchemaRes = typeof findSchemaRes;
export type FindAllSchemaReq = typeof findAllSchemaReq;
export type FindAllSchemaRes = typeof findAllSchemaRes;
export type DeactivateSchemaReq = typeof deactivateSchemaReq;
export type DeactivateSchemaRes = typeof deactivateSchemaRes;
export type DeleteSchemaReq = typeof deleteSchemaReq;
export type DeleteSchemaRes = typeof deleteSchemaRes;