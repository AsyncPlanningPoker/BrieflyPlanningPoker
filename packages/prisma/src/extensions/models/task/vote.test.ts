import { describe, expect, test, vi } from 'vitest'
import prisma from '../../../prisma-client'
import mockedPrisma from '../../../__mocks__/prisma-client'
import voteExtension from './vote';

vi.mock('../../../prisma-client');

const voteFunction = voteExtension(prisma as any);

const now = new Date();
const id = 'foo task';
const userEmail = 'test@email.com';
const points = 1;
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
    squad: { users: [{ user: { email: userEmail }}]},
    maxRounds: 3,
    percentual: .85,
    votes: [],
    messages: []
};

mockedPrisma.task.findUniqueOrThrow.mockResolvedValue(val as any);
mockedPrisma.task.update.mockImplementation(({ data }) => {
    const newVote = {...data.votes!.create! } as any;
    newVote.userEmail = newVote.user.connect.email;
    newVote.createdAt = now;
    delete newVote.user;
    const increment = (data.currentRound as any).increment;
    const currentRound = val.currentRound + increment;
    return {...val, ...data, currentRound, votes: [newVote] } as any;
});
mockedPrisma.$transaction.mockImplementation(async data => await data(prisma));

describe('A user', () => {
    describe('who has not voted in the current round', () => {
        describe('in a team with an active task', () => {
            describe('should be able to vote in said task', () => {
                test('(and not throw an error)', async () => {
                    expect(voteFunction(id, userEmail, points)).resolves.not.toThrow();
                });
                // test('And', async () => {
                //     const task = await voteFunction(id, userEmail, points);
                //     const val2 = {
                //         ...val,
                //         votes: [{ userEmail, round: val.currentRound, createdAt: now, points }],
                //     };
                //     expect(task).toStrictEqual(val2);
                // });
            });
        });
    });
});
