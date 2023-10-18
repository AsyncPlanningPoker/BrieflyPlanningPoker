import { makeApi, makeEndpoint, makeParameters } from "@zodios/core";
import { z } from "zod";

const createUserRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
}).strict();

const createUserParams = makeParameters([
    {
        name: "User",
        type: "Body",
        schema: createUserRequestSchema
    }
]);

const createUserEndpoint = makeEndpoint({
    method: 'post',
    path: '',
    response: createUserRequestSchema,
    parameters: createUserParams,
    description: 'Create an user',
    alias: 'createUser'
});

export const usersAPI = makeApi([createUserEndpoint]);