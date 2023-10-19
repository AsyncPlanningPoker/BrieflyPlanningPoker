import { makeEndpoint, makeApi, type ZodiosEndpointParameter, makeParameters } from '@zodios/core';
import { squads, tasks } from '../apiSchemas'
import { z } from 'zod';

const addUsersSchema = z.object({
    email: z.string().email(),
    owner: z.boolean().default(false)
}).strict();

type AddUsersSchema = z.input<typeof addUsersSchema>

// Parameters

const squadIdParams = makeParameters([{
    name: 'Find',
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

// const findBodyParams= makeParameters([{
//     name: 'Find',
//     type: 'Body',
//     description: 'Input credentials',
//     schema: squads.findSchemaReq
// }]);

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
    schema: addUsersSchema
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
    schema: tasks.createSchemaReq
}]);

// Endpoints

const createEndpoint = makeEndpoint({
    method: 'post',
    path: '',
    response: squads.createSchemaRes,
    parameters: createBodyParams,
    alias: 'createSquad',
    description: 'Create an squad',
    responseDescription: "The created squad"
});

const findAllEndpoint = makeEndpoint({
    method: 'get',
    path: '',
    response: squads.findAllSchemaRes,
    // parameters: [squadIdParams],
    alias: 'findAllSquads',
    description: 'List all squads that the current user is a part of',
    responseDescription: "A list of squads"
});

const findEndpoint = makeEndpoint({
    method: 'get',
    path: '/:squadId',
    response: squads.findSchemaRes,
    parameters: squadIdParams,
    alias: 'findSquad',
    description: 'Display information about a specific squad',
    responseDescription: "A squad"
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
    response: squads.delUsersSchemaRes,
    parameters: [...squadIdParams, ...addUsersBodyParams],
    alias: 'addUsersSquad',
    description: 'Add users to a squad',
    responseDescription: ""
});

const deleteUsersEndpoint = makeEndpoint({
    method: 'delete',
    path: '/:squadId/users',
    response: squads.delUsersSchemaRes,
    parameters: [...squadIdParams, ...deleteUsersQueryParams],
    alias: 'delUsersSquad',
    description: 'Remove users from a squad',
    responseDescription: ""
});

const createTaskEndpoint = makeEndpoint({
    method: 'post',
    path: '/:squadId/tasks',
    response: tasks.createSchemaRes,
    parameters: [...squadIdParams, ...createTaskBodyParams],
    alias: 'createTaskSquad',
    description: 'Create a task and add it to a specific squad',
    responseDescription: "The created task"
});

const findAllTasksEndpoint = makeEndpoint({
    method: 'get',
    path: '/:squadId/tasks',
    response: tasks.findAllSchemaRes,
    parameters: squadIdParams,
    description: 'List all tasks belonging to a specific squad',
    responseDescription: "A list of tasks"
});


const squadsAPI = makeApi([
    createEndpoint,
    findAllEndpoint,
    findEndpoint,
    updateEndpoint,
    addUsersEndpoint,
    deleteUsersEndpoint,
    createTaskEndpoint,
    findAllTasksEndpoint
]);

export default squadsAPI;
export type SquadsAPI = typeof squadsAPI;