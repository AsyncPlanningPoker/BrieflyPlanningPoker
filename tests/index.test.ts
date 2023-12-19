import { describe, expect, test } from "vitest";
import request  from "supertest";

const req = request('http://localhost:8000/api');

describe.sequential("[POST] /users", () => {
    test('should respond with a 201 status and a user bearer token', async () => {
        const { status, body } = await req.post('/users').send({ 
            name: 'test user',
            email: 'test@email.com',
            password: 'passExample'
         });
         expect(status).toBe(201);
         expect(body).toStrictEqual({
            token: expect.any(String)
         });
    });
    test('should respond with a 400 status when the user already exists', async () => {
        const { status, body } = await req.post('/users').send({ 
            name: 'test user',
            email: 'test@email.com',
            password: 'passExample'
         });
         console.log(status);
         console.log(body);
    });
});