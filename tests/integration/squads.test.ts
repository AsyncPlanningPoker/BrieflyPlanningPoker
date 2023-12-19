import { describe, expect, test } from "vitest";
import request  from "supertest";
import prisma from '../../packages/prisma/src'

const req = request('http://localhost:8000/api');

describe('[POST] /squads', () => {
    test('should create an empty squad, if the user is logged in', async () => {
        const data = {
            name: 'user',
            email: 'user@email.com',
            password: 'pass'
        }
        const { email } = await prisma.user.create({ data });
        const { body } = await req.post("/users/login").send({
            email,
            password: data.password
        });
        const squad = {
            name: 'test squad',
            maxRounds: 3,
            percentual: .8
        }
        const res = await req.post("/squads")
            .send(squad)
            .auth(body.token, { type: 'bearer' });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            id: expect.any(String),
            ...squad
        })
    });
});