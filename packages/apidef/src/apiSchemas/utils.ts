import { z } from "zod";
export const percentual: z.ZodRawShape = { percentual: z.number().step(0.5) }