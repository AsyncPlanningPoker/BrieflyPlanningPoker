import { zodiosContext } from "@zodios/express";
import { z } from "zod";

const ctx = z.object({
    user: z.object({
        email: z.string().email()
    })
});

const context = zodiosContext(ctx);

export default context;

export type Context = typeof ctx;