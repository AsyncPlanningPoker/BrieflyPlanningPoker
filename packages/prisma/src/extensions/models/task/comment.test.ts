import { describe, expect, test, vi, afterAll } from 'vitest'
import prisma from '../../../prisma-client'
import { type TaskWithRelations, loadTasks, clearDb } from '../../../__mocks__/prisma-client'
import commentExtension from './comment';

vi.mock('../../../prisma-client');

const commentFunction = commentExtension(prisma as any);

const now = new Date();
const id = 'foo task';
const email = 'test@email.com';
const message = 'Test message';
const currentRound = 1;

const tasks: TaskWithRelations[] = [
    {
        id,
        active: true,
        description: 'Task to comment on',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users:[{ user: { email }}]},
        maxRounds: 1,
        percentual: .85,
        votes: [],
        messages: []
    },
    {
        id: 'no_access',
        active: true,
        description: 'Task to comment on',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users:[] },
        maxRounds: 1,
        percentual: .85,
        votes: [],
        messages: []
    },
];

loadTasks(tasks);
afterAll(() => clearDb());

describe('Comment extension', () => {
    describe('A user that', () => {
        describe('is a member of the squad', () => {
            test('should be able to comment in the current round of a task', async () => {
                const task = await commentFunction(id, email, message);
                expect(task.messages).toEqual([
                    expect.objectContaining({ user: { email }, round: currentRound, message })
                ]);
            });
        });
        describe('is not a member of the squad', () => {
            test('should be able to comment in the current round of a task', async () => {
                const task = await commentFunction('no_access', email, message);
                expect(task.messages).toEqual([
                    expect.objectContaining({ user: { email }, round: currentRound, message })
                ]);
            });
        });
    });
});
