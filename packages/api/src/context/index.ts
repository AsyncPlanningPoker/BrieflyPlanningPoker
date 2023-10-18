import { zodiosContext } from "@zodios/express";
import { z } from "zod";

const context = z.object({
    user: z.object({
        email: z.string().email()
    }).optional()
});

// const context = zodiosContext(ctx);

export default context;

export type Context = typeof context;