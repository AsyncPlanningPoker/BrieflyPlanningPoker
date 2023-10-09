import { z } from "zod";
import { TaskOptionalDefaultsSchema } from "../generated/zod";


/** Esquema para criacao de uma task */
export const createSchema = TaskOptionalDefaultsSchema.strict();

/**
 * Esquema para listar todas as tasks de uma squad **(vazio)**
 * 
 * Nao sei se precisa...
 */
export const findAllSchema = z.object({}).strict();

/**
 * Esquema para listar uma task **(vazio)**
 * 
 * Nao sei se precisa...
 */
export const findSchema = z.object({}).strict();

/**
 * Esquema para desativar uma task **(vazio)**
 * 
 * Nao sei se precisa...
 */
export const deactivateSchema = z.object({}).strict();

/**
 * Esquema para excluir uma task **(vazio)**
 * 
 * Nao sei se precisa...
 */
export const deleteSchema = z.object({}).strict();