import { z } from "zod";
import { VoteSchema, MessageSchema } from "../generated/zod";


/** Esquema para realizacao de um voto em uma task */
export const voteSchema = VoteSchema.pick({ points: true }).strict();

/** Esquema para realizacao de um voto em uma task */
export const messageSchema = MessageSchema.pick({ message: true }).strict();