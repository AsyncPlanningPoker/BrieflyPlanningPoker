import { makeEndpoint, makeApi, makeParameters } from '@zodios/core';
import { users } from '../apiSchemas'
import { z } from 'zod';

// Parameters

const createBodyParams = makeParameters([{
    name: 'Create',
    type: 'Body',
    description: 'Input user details',
    schema: users.createSchemaReq
}]);

const loginBodyParams = makeParameters([{
    name: 'Login',
    type: 'Body',
    description: 'Input credentials',
    schema: users.loginSchemaReq
}]);

const deleteBodyParams = makeParameters([{
    name: 'Delete',
    type: 'Body',
    description: '',
    schema: users.deleteSchemaReq
}]);

const updateBodyParams = makeParameters([{
    name: 'Update',
    type: 'Body',
    description: 'Input user details (optional)',
    schema: users.updateSchemaReq
}]);

// Endpoints

const createEndpoint = makeEndpoint({
    method: 'post',
    path: '',
    response: users.createSchemaRes,
    parameters: createBodyParams,
    alias: 'createUser',
    description: 'Create an user',
    responseDescription: "A JWT Bearer auth token for the newly created user"
});

const loginEndpoint = makeEndpoint({
    method: 'post',
    path: '/login',
    response: users.loginSchemaRes,
    parameters: loginBodyParams,
    alias: 'loginUser',
    description: 'Authenticate an user',
    responseDescription: "A JWT Bearer auth token"
});

const deleteEndpoint = makeEndpoint({
    method: 'delete',
    path: '',
    response: users.deleteSchemaRes,
    // parameters: [deleteBodyParams],
    alias: 'deleteUser',
    description: 'Delete an user',
    responseDescription: "The deleted user"
});

const updateEndpoint = makeEndpoint({
    method: 'put',
    path: '',
    response: users.updateSchemaRes,
    parameters: updateBodyParams,
    alias: 'updateUser',
    description: 'Update an user',
    responseDescription: "The updated user"
});
const eventsParams = makeParameters([{
    type: 'Header',
    name: 'Accept',
    schema: z.literal('text/event-stream')
}]);

const eventsEndpoint = makeEndpoint({
    method: 'get',
    path: "/events",
    response: z.any(),
    parameters: eventsParams
});

const usersAPI = makeApi([createEndpoint, loginEndpoint, deleteEndpoint, updateEndpoint, eventsEndpoint]);

export default usersAPI;
export type UsersAPI = typeof usersAPI;