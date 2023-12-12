import { describe, expect, test, vi } from 'vitest'
import prisma from '../../../prisma-client'
import mockedPrisma from '../../../__mocks__/prisma-client'
import commentExtension from './comment';

vi.mock('../../../prisma-client');

const commentFunction = commentExtension(prisma as any);

describe('Comment extension', () => {
    test('A user should be able to comment in the current round of a task', async () => {
        const now = new Date();
        const id = 'foo task';
        const email = 'test@email.com';
        const message = 'Test message';
        const currentRound = 0;

        const val = {
            id,
            active: true,
            description: 'foo',
            createdAt: now,
            updatedAt: now,
            currentRound,
            enabled: true,
            finished: false,
            points: null,
            name: 'New task',
            squadId: 'foo',
            maxRounds: 3,
            percentual: .85
        };
        const val2 = {
            ...val,
            messages: [{
                userEmail: email ,
                round: val.currentRound,
                createdAt: now,
                message
            }],
            votes: []
        }

        mockedPrisma.task.findUniqueOrThrow.mockResolvedValue({ currentRound: val.currentRound } as any);
        mockedPrisma.task.update.mockResolvedValue(val2 as any);
        mockedPrisma.$transaction.mockImplementation(async data => await data(prisma));

        const task = await commentFunction(id, email, message);
        expect(task).toStrictEqual(val2);
    });
});
