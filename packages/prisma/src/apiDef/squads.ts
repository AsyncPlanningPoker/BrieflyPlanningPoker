import { makeEndpoint, makeApi, type ZodiosEndpointParameter } from '@zodios/core';
import { squads, tasks } from '../apiSchemas'
import { z } from 'zod';

const addUsersSchema = z.object({
    email: z.string().email(),
    owner: z.boolean().default(false)
}).strict();

type AddUsersSchema = z.input<typeof addUsersSchema>

// Parameters

const squadIdParams: ZodiosEndpointParameter<string> = {
    name: 'Find',
    type: 'Path',
    description: 'The unique identifier of the squad',
    schema: z.string().uuid()
};

const createBodyParams: ZodiosEndpointParameter<squads.CreateSchemaReq> = {
    name: 'Create',
    type: 'Body',
    description: 'Input squad details',
    schema: squads.createSchemaReq
};

// const findBodyParams: ZodiosEndpointParameter<squads.FindSchemaReq> = {
//     name: 'Find',
//     type: 'Body',
//     description: 'Input credentials',
//     schema: squads.findSchemaReq
// };

const updateBodyParams: ZodiosEndpointParameter<squads.UpdateSchemaReq> = {
    name: 'Update',
    type: 'Body',
    description: 'Input squad details (optional)',
    schema: squads.updateSchemaReq
};

const addUsersBodyParams: ZodiosEndpointParameter<AddUsersSchema> = {
    name: 'Email',
    type: 'Body',
    description: 'The email of the user to add and a boolean field indicating if the user is the owner of the squad',
    schema: addUsersSchema
};

const deleteUsersQueryParams: ZodiosEndpointParameter<string> = {
    name: 'Email',
    type: 'Query',
    description: 'The email of the user',
    schema: z.string().email()
};

// Endpoints

const createEndpoint = makeEndpoint({
    method: 'post',
    path: '',
    response: squads.createSchemaRes,
    parameters: [createBodyParams],
    description: 'Create an squad',
    responseDescription: "The created squad"
});

const findAllEndpoint = makeEndpoint({
    method: 'get',
    path: '',
    response: squads.findAllSchemaRes,
    // parameters: [squadIdParams],
    description: 'List all squads that the current user is a part of',
    responseDescription: "A list of squads"
});

const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:squadId',
    response: squads.findSchemaRes,
    parameters: [squadIdParams],
    description: 'Display information about a specific squad',
    responseDescription: "A squad"
});

const updateEndpoint = makeEndpoint({
    method: 'put',
    path: '/:squadId',
    response: squads.updateSchemaRes,
    parameters: [updateBodyParams],
    description: 'Update an squad',
    responseDescription: "The updated squad"
});

const addUsersEndpoint = makeEndpoint({
    method: 'post',
    path: '/:squadId/users',
    response: squads.delUsersSchemaRes,
    parameters: [squadIdParams, addUsersBodyParams],
    description: 'Add users to a squad',
    responseDescription: ""
});

const deleteUsersEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:squadId/users',
    response: squads.delUsersSchemaRes,
    parameters: [squadIdParams, deleteUsersQueryParams],
    description: 'Remove users from a squad',
    responseDescription: ""
});

const squadsAPI = makeApi([
    createEndpoint,
    findAllEndpoint,
    findEndpoint,
    updateEndpoint,
    addUsersEndpoint,
    deleteUsersEndpoint
]);

export default squadsAPI;
export type SquadsAPI = typeof squadsAPI;