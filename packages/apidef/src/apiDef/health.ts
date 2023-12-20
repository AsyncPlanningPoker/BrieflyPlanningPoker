import { makeEndpoint, makeApi, makeParameters } from '@zodios/core';
import { z } from 'zod';

// Endpoints
const healthEndpoint = makeEndpoint({
    method: 'get',
    path: '',
    response: z.never(),
    alias: 'healthCheck',
    description: 'Health check',
    status: 204
});

const healthApi = makeApi([healthEndpoint]);

export default healthApi;
export type HealthApi = typeof healthApi;