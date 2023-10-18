import { makeEndpoint, makeApi, type ZodiosEndpointParameter } from '@zodios/core';
import { tasks, voting } from '../apiSchemas'
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

// const createBodyParams: ZodiosEndpointParameter<tasks.CreateSchemaReq> = {
//     name: 'Create',
//     type: 'Body',
//     description: 'Input task details',
//     schema: tasks.createSchemaReq
// };

// const findBodyParams: ZodiosEndpointParameter<tasks.FindSchemaReq> = {
//     name: 'Find',
//     type: 'Body',
//     description: 'Input credentials',
//     schema: tasks.findSchemaReq
// };

// const updateBodyParams: ZodiosEndpointParameter<tasks.UpdateSchemaReq> = {
//     name: 'Update',
//     type: 'Body',
//     description: 'Input task details (optional)',
//     schema: tasks.updateSchemaReq
// };

const voteBodyParams: ZodiosEndpointParameter<voting.VoteSchemaReq> = {
    name: 'Vote',
    type: 'Body',
    description: 'A object containing the number of points of the users vote',
    schema: voting.voteSchemaReq
};

const messageBodyParams: ZodiosEndpointParameter<voting.MessageSchemaReq> = {
    name: 'Message',
    type: 'Body',
    description: 'A object containing the users message',
    schema: voting.messageSchemaReq
};

// const deleteUsersQueryParams: ZodiosEndpointParameter<string> = {
//     name: 'Email',
//     type: 'Query',
//     description: 'The email of the user',
//     schema: z.string().email()
// };


// Endpoints


const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:taskId',
    response: tasks.findSchemaRes,
    parameters: [taskIdParams],
    alias: 'findTask',
    description: 'Display information about a specific task',
    responseDescription: "A task"
});

const deactivateEndpoint = makeEndpoint({
    method: 'put',
    path: '/:taskId',
    response: tasks.deactivateSchemaRes,
    parameters: [taskIdParams],
    alias: 'deactivateTask',
    description: 'Deactivate a task',
    responseDescription: "The deactivated task"
});

const deleteEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:taskId',
    response: tasks.deleteSchemaRes,
    parameters: [taskIdParams],
    alias: 'deleteTask',
    description: 'Delete a task',
    responseDescription: "The deleted task"
});

const voteEndpoint = makeEndpoint({
    method: 'post',
    path: '/:taskId/votes',
    response: voting.voteSchemaRes,
    parameters: [taskIdParams, voteBodyParams],
    alias: 'voteTask',
    description: 'Submit a vote to a task',
    responseDescription: ""
});

const messageEndpoint = makeEndpoint({
    method: 'post',
    path: '/:taskId/messages',
    response: voting.messageSchemaRes,
    parameters: [taskIdParams, messageBodyParams],
    alias: 'messageTask',
    description: 'Submit a message to a task',
    responseDescription: ""
});

// const addUsersEndpoint = makeEndpoint({
//     method: 'post',
//     path: '/:taskId/users',
//     response: tasks.delUsersSchemaRes,
//     parameters: [taskIdParams, addUsersBodyParams],
//     alias: 'addUserstask',
//     description: 'Add users to a task',
//     responseDescription: ""
// });



const tasksAPI = makeApi([findEndpoint, deactivateEndpoint, deleteEndpoint, voteEndpoint, messageEndpoint]);

export default tasksAPI;
export type tasksAPI = typeof tasksAPI;