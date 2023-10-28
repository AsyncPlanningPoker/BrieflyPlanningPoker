import { makeEndpoint, makeApi, makeParameters } from '@zodios/core';
import { z } from 'zod';

import { squads } from '../apiSchemas'

// Parameters

const squadIdParams = makeParameters([{
    name: 'squadId',
    type: 'Path',
    description: 'The unique identifier of the squad',
    schema: z.string().uuid()
}]);

const createBodyParams = makeParameters([{
    name: 'Create',
    type: 'Body',
    description: 'Input squad details',
    schema: squads.createSchemaReq
}]);

const updateBodyParams = makeParameters([{
    name: 'Update',
    type: 'Body',
    description: 'Input squad details (optional)',
    schema: squads.updateSchemaReq
}]);

const addUsersBodyParams = makeParameters([{
    name: 'Email',
    type: 'Body',
    description: 'The email of the user to add and a boolean field indicating if the user is the owner of the squad',
    schema: squads.addUsersSchemaReq
}]);

const deleteUsersQueryParams = makeParameters([{
    name: 'email',
    type: 'Query',
    description: 'The email of the user',
    schema: z.string().email()
}]);

const createTaskBodyParams = makeParameters([{
    name: 'Create task',
    type: 'Body',
    description: 'Input squad details',
    schema: squads.createTaskSchemaReq
}]);


// Endpoints

const createEndpoint = makeEndpoint({
    method: 'post',
    path: '',
    response: squads.createSchemaRes,
    parameters: createBodyParams,
    alias: 'createSquad',
    description: 'Create a squad',
    responseDescription: "The created squad"
});

const findAllEndpoint = makeEndpoint({
    method: 'get',
    path: '',
    response: squads.findAllSchemaRes,
    // parameters: [squadIdParams],
    alias: 'findAllSquads',
    description: 'List all squads that the current user is a part of',
    responseDescription: "A list of squads, not including its tasks or users"
});

const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:squadId',
    response: squads.findSchemaRes,
    parameters: squadIdParams,
    alias: 'findSquad',
    description: 'Display information about a specific squad',
    responseDescription: "A squad, including its tasks and users"
});

const updateEndpoint = makeEndpoint({
    method: 'put',
    path: '/:squadId',
    response: squads.updateSchemaRes,
    parameters: [...squadIdParams, ...updateBodyParams],
    alias: 'updateSquad',
    description: 'Update an squad',
    responseDescription: "The updated squad"
});

const addUsersEndpoint = makeEndpoint({
    method: 'post',
    path: '/:squadId/users',
    response: squads.addUsersSchemaRes,
    parameters: [...squadIdParams, ...addUsersBodyParams],
    alias: 'addUsersSquad',
    description: 'Add users to a squad',
    responseDescription: "The squad with the updated info"
});

const deleteUsersEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:squadId/users',
    response: squads.delUsersSchemaRes,
    parameters: [...squadIdParams, ...deleteUsersQueryParams],
    alias: 'delUsersSquad',
    description: 'Remove users from a squad',
    responseDescription: "The squad with the updated info"
});

const createTaskEndpoint = makeEndpoint({
    method: 'post',
    path: '/:squadId/tasks',
    response: squads.createTaskSchemaRes,
    parameters: [...squadIdParams, ...createTaskBodyParams],
    alias: 'createTaskSquad',
    description: 'Create a task and add it to a specific squad',
    responseDescription: "The created task"
});

const squadsAPI = makeApi([
    createEndpoint,
    findAllEndpoint,
    findEndpoint,
    updateEndpoint,
    addUsersEndpoint,
    deleteUsersEndpoint,
    createTaskEndpoint
]);

export default squadsAPI;
export type SquadsAPI = typeof squadsAPI;