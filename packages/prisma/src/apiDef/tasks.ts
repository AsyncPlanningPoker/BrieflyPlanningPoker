import { makeEndpoint, makeApi, makeParameters } from '@zodios/core';
import { tasks } from '../apiSchemas'
import { z } from 'zod';

// Parameters

const taskIdParams = makeParameters([{
    name: 'taskId',
    type: 'Path',
    description: 'The unique identifier of the task',
    schema: z.string().uuid()
}]);

const voteBodyParams = makeParameters([{
    name: 'Vote',
    type: 'Body',
    description: 'A object containing the number of points of the users vote',
    schema: tasks.voteSchemaReq
}]);

const messageBodyParams = makeParameters([{
    name: 'Message',
    type: 'Body',
    description: 'A object containing the users message',
    schema: tasks.messageSchemaReq
}]);


// Endpoints

const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:taskId',
    response: tasks.findSchemaRes,
    parameters: taskIdParams,
    alias: 'findTask',
    description: 'Display information about a specific task',
    responseDescription: "A task"
});

const deactivateEndpoint = makeEndpoint({
    method: 'put',
    path: '/:taskId',
    response: tasks.deactivateSchemaRes,
    parameters: taskIdParams,
    alias: 'deactivateTask',
    description: 'Deactivate a task',
    responseDescription: "The deactivated task"
});

const deleteEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:taskId',
    response: tasks.deleteSchemaRes,
    parameters: taskIdParams,
    alias: 'deleteTask',
    description: 'Delete a task',
    responseDescription: "The deleted task"
});

const voteEndpoint = makeEndpoint({
    method: 'post',
    path: '/:taskId/votes',
    response: tasks.voteSchemaRes,
    parameters: [...taskIdParams, ...voteBodyParams],
    alias: 'voteTask',
    description: 'Submit a vote to a task',
    responseDescription: ""
});

const messageEndpoint = makeEndpoint({
    method: 'post',
    path: '/:taskId/messages',
    response: tasks.messageSchemaRes,
    parameters: [...taskIdParams, ...messageBodyParams],
    alias: 'messageTask',
    description: 'Submit a message to a task',
    responseDescription: ""
});

const tasksAPI = makeApi([findEndpoint, deactivateEndpoint, deleteEndpoint, voteEndpoint, messageEndpoint]);

export default tasksAPI;
export type TasksAPI = typeof tasksAPI;