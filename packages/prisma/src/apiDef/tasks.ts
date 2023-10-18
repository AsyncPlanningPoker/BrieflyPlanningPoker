import { makeEndpoint, makeApi, type ZodiosEndpointParameter } from '@zodios/core';
import { tasks, squads } from '../apiSchemas'
import { z } from 'zod';

// const addUsersSchema = z.object({
//     email: z.string().email(),
//     owner: z.boolean().default(false)
// }).strict();

// type AddUsersSchema = z.input<typeof addUsersSchema>

// Parameters

const taskIdParams: ZodiosEndpointParameter<string> = {
    name: 'Find',
    type: 'Path',
    description: 'The unique identifier of the task',
    schema: z.string().uuid()
};

const createBodyParams: ZodiosEndpointParameter<tasks.CreateSchemaReq> = {
    name: 'Create',
    type: 'Body',
    description: 'Input task details',
    schema: tasks.createSchemaReq
};

// const findBodyParams: ZodiosEndpointParameter<tasks.FindSchemaReq> = {
//     name: 'Find',
//     type: 'Body',
//     description: 'Input credentials',
//     schema: tasks.findSchemaReq
// };

const updateBodyParams: ZodiosEndpointParameter<tasks.UpdateSchemaReq> = {
    name: 'Update',
    type: 'Body',
    description: 'Input task details (optional)',
    schema: tasks.updateSchemaReq
};

const addUsersBodyParams: ZodiosEndpointParameter<AddUsersSchema> = {
    name: 'Email',
    type: 'Body',
    description: 'The email of the user to add and a boolean field indicating if the user is the owner of the task',
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
    response: tasks.createSchemaRes,
    parameters: [createBodyParams],
    description: 'Create an task',
    responseDescription: "The created task"
});

const findAllEndpoint = makeEndpoint({
    method: 'get',
    path: '',
    response: tasks.findAllSchemaRes,
    // parameters: [taskIdParams],
    description: 'List all tasks that the current user is a part of',
    responseDescription: "A list of tasks"
});

const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:taskId',
    response: tasks.findSchemaRes,
    parameters: [taskIdParams],
    description: 'Display information about a specific task',
    responseDescription: "A task"
});

const updateEndpoint = makeEndpoint({
    method: 'put',
    path: '/:taskId',
    response: tasks.updateSchemaRes,
    parameters: [updateBodyParams],
    description: 'Update an task',
    responseDescription: "The updated task"
});

const addUsersEndpoint = makeEndpoint({
    method: 'post',
    path: '/:taskId/users',
    response: tasks.delUsersSchemaRes,
    parameters: [taskIdParams, addUsersBodyParams],
    description: 'Add users to a task',
    responseDescription: ""
});

const deleteUsersEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:taskId/users',
    response: tasks.delUsersSchemaRes,
    parameters: [taskIdParams, deleteUsersQueryParams],
    description: 'Remove users from a task',
    responseDescription: ""
});

const tasksAPI = makeApi([
    createEndpoint,
    findAllEndpoint,
    findEndpoint,
    updateEndpoint,
    addUsersEndpoint,
    deleteUsersEndpoint
]);

export default tasksAPI;
export type tasksAPI = typeof tasksAPI;