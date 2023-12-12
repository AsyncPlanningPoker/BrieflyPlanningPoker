import { describe, expect, test, vi } from 'vitest'
import prisma from './prisma-client'
import mockedPrisma from './__mocks__/prisma-client'

vi.mock('../src/prisma-client');

describe('Prisma client', () => {
    describe('A task', () => {
        test('should finish', async () => {
            const now = new Date();
            const newUser = {
                name: 'João',
                email: 'test@email.com',
                createdAt: now,
                updatedAt: now,
                enabled: true,
                password: 'pass'
            };
            mockedPrisma.user.create.mockResolvedValue(newUser);
            const user = await prisma.user.create({ data: newUser });
        });
    });
});
