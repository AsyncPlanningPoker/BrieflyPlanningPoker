import { describe, expect, test } from "vitest";
import request  from "supertest";
import prisma from '../../packages/prisma/src'

const req = request('http://localhost:8000/api');

describe("[POST] /users", () => {
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
        const user = { 
            name: 'already',
            email: 'already_exists@email.com',
            password: 'somepass'
        };
        await prisma.user.create({ data: user });
        const { status, body } = await req.post('/users').send(user);
        expect(status).toBe(400);
    });
    test('should respond with a 400 status when the request body is invalid', async () => {
        const user = { 
            name: 'user',
            email: 'user@email.com',
        };
        const { status, body } = await req.post('/users').send(user);
        expect(status).toBe(400);
    });
    describe('[POST] /users/login', () => {
        test('should return a valid token when the user exists and its authorization details are correct', async () => {
            const user = { 
                email: 'user@email.com',
                password: 'pass'
            };
            await prisma.user.create({ data: {...user, name: 'user'} });
            const { status, body } = await req.post('/users/login').send(user);
            expect(status).toBe(200);
            expect(body).toStrictEqual({
                token: expect.any(String)
            });
        });
    });
    describe.todo('[GET] /events');
});