import { describe, expect, test, vi, it } from 'vitest'
import prisma from '../../../prisma-client'
import mockedPrisma from '../../../__mocks__/prisma-client'
import voteExtension, { calcFinalPoints, validatePoints } from './vote';
import type { Vote } from '../../../utils';

vi.mock('../../../prisma-client');

const voteFunction = voteExtension(prisma as any);

/**
 * We need to test several different scenarios for the voting function, affected by these variables,
 * that are more or less independent of each other:
 * 
 * 1. Is the vote format valid?                               points
 * 2. Is the task active?                                     task.active
 * 3. Is the user a member of the squad that owns the task?   task.squad
 * 4. Has the user not already voted this round in said task? task.votes
 * 5. Has everybody else voted this round?                    task.votes
 * 6. A consensus have been reached?                          task.votes
 * 7. Has the maximum number of rounds been reached?          task.currentRound && task.maxRounds
 * 
 *  (-1, x, x, x, x, x, x) -> Throw "The vote format is invalid"  
 *  (+1,-1, x, x, x, x, x) -> Throw "Cannot vote in an inactive task"  
 *  (+1,+1,-1, x, x, x, x) -> Throw "User cannot vote in a task which squad he isnt a member"  
 *  (+1,+1,+1,-1, x, x, x) -> Throw "User cannot vote twice in the same round"  
 *  (+1,+1,+1,+1,-1, x, x) -> The user vote should be registered, but the current round, status
 *      and points of the task should not change  
 *  (+1,+1,+1,+1,+1,-1,-1) -> User vote should be registered and current round should be
 *      incremented by one, but status and points of the task should not change  
 *  (+1,+1,+1,+1,-1,-1,+1) -> User vote should be registered, current round should be
 *      incremented by one, the status of the task should change to finished and the points
 *      of the task should be calculated using the specified form  
 *  (+1,+1,+1,+1,-1,+1, x) -> User vote should be registered, current round should be
 *      incremented by one, the status of the task should change to finished and the points
 *      of the task should be the most picked choice
 */

const now = new Date();
const userEmail = 'test@email.com';
const points = 1;
const currentRound = 1;
const tasks: any = [
    {
        id: 'inactive',
        active: false,
        description: 'Inactive task',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: false,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: userEmail }}]},
        maxRounds: 3,
        percentual: .85,
        votes: [],
        messages: []
    },
    {
        id: 'not_member',
        active: true,
        description: 'User is not a member',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: 'another@email.com' }}]},
        maxRounds: 3,
        percentual: .85,
        votes: [],
        messages: []
    },
    {
        id: 'already_voted',
        active: true,
        description: 'User has already voted this round',
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
        votes: [{ createdAt: now, points: 1, round: 1, user: { email: userEmail }}],
        messages: []
    },
    {
        id: 'someone_left',
        active: true,
        description: 'Not everybody else has voted this round',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: userEmail }}, { user: { email: 'another@email.com' }}]},
        maxRounds: 3,
        percentual: .85,
        votes: [],
        messages: []
    },
    {
        id: 'consensus',
        active: true,
        description: 'A consensus should be reached',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: userEmail }}, { user: { email: 'another@email.com' }}]},
        maxRounds: 3,
        percentual: .85,
        votes: [{ createdAt: now, points: 1, round: 1, user: { email: 'another@email.com' }}],
        messages: []
    },
    {
        id: 'rounds_left',
        active: true,
        description: 'No consensus should be reached, and there still are rounds left',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: userEmail }}, { user: { email: 'another@email.com' }}]},
        maxRounds: 3,
        percentual: .85,
        votes: [{ createdAt: now, points: 80, round: 1, user: { email: 'another@email.com' }}],
        messages: []
    },
    {
        id: 'max_rounds',
        active: true,
        description: 'No consensus should be reached, but there are no rounds left',
        createdAt: now,
        updatedAt: now,
        currentRound,
        enabled: true,
        finished: false,
        points: null,
        name: 'New task',
        squadId: 'foo',
        squad: { users: [{ user: { email: userEmail }},
            { user: { email: 'another_one@email.com' }},
            { user: { email: 'another_two@email.com' }},
        ]},
        maxRounds: 1,
        percentual: .85,
        votes: [
            { createdAt: now, points: 80, round: 1, user: { email: 'another_one@email.com' }},
            { createdAt: now, points: 80, round: 1, user: { email: 'another_two@email.com' }},
        ],
        messages: []
    },
];
const aggFields = ['votes', 'messages'];

mockedPrisma.$transaction.mockImplementation(async data => await data(prisma));
mockedPrisma.task.findUniqueOrThrow.mockImplementation(({ where, include, select }) => {
    const retTask = tasks.find((task: any) => where.id == task.id);
    if(! retTask) throw new Error(`Can't find task with id ${where.id}`);
    if(include)
        for(const key of aggFields)
            if(!(key in include)) delete retTask[key as keyof typeof retTask];

    if(select)
        for(const key in retTask)
            if(!(key in aggFields) && !(key in select)) delete retTask[key as keyof typeof retTask];
    
    return retTask as any;
});
mockedPrisma.task.update.mockImplementation(({ data, where }) => {
    let newVote = {...data.votes?.create } as any;
    if(Object.keys(newVote).length != 0){
        newVote.userEmail = newVote.user.connect.email;
        newVote.createdAt = now;
        delete newVote.user;
    } else newVote = undefined;
    const increment = (data.currentRound as any)?.increment ?? 0;
    const retTask = tasks.findIndex((task: any) => task.id == where.id);
    if(retTask < -1) throw new Error(`Can't find task with id ${where.id}`);
    console.log(tasks[retTask]);
    const currentRound = tasks[retTask].currentRound + increment;
    tasks[retTask] = {...tasks[retTask], ...data, currentRound, votes: tasks[retTask].votes.concat(newVote ?? []) };
    return retTask;
});

describe('Voting: when a user, with', () => {
    describe('an invalid vote format tries to vote in any task', () => {
        it('should raise an error', () => {
            expect(() => voteFunction('consensus', userEmail, -1)).rejects.toThrow();
            expect(() => voteFunction('consensus', userEmail, 0.5)).rejects.toThrow();
        });
    });
    describe('a valid vote format', () => {
        describe('tries to vote in an inactive task', () => {
            it('should raise an error', () => {
                expect(() => voteFunction('inactive', userEmail, points)).rejects.toThrow();
            });
        });
        describe('tries to vote in an active task', () => {
            describe('which squad he is not a member of', () => {
                it('should raise an error', () => {
                    expect(() => voteFunction('not_member', userEmail, points)).rejects.toThrow();
                });
            });
            describe('which squad he is a member of', () => {
                describe('while having already voted this round', () => {
                    it('should raise an error', () => {
                        expect(() => voteFunction('already_voted', userEmail, points)).rejects.toThrow();
                    });
                });
                describe('while not having voted this round yet', () => {
                    describe('and somebody else still has to vote this round', async () => {
                        await voteFunction('someone_left', userEmail, points);
                        const votedTask = await prisma.task.findUniqueOrThrow({
                            where: { id: 'someone_left' }, include: { votes: true }});
                        it('should register the user vote', async () => {
                            const userVote = votedTask.votes.find(
                                (vote) => vote.userEmail == userEmail && vote.round == currentRound);
                            expect(userVote).toMatchObject({
                                points,
                                userEmail,
                                round: currentRound
                            });
                        });
                        describe('it should not change', () => {
                            it('the tasks current round', () => expect(votedTask.currentRound).toBe(currentRound));
                            it('the tasks status', () => expect(votedTask.active).toBe(true));
                            it('the tasks points', () => expect(votedTask.points).toBeNull());
                        });
                    });
                    describe('and everybody else has already voted this round', () => {
                        describe('and a consensus is to be reached', async () => {
                            await voteFunction('consensus', userEmail, points);
                            const votedTask = await prisma.task.findUniqueOrThrow({
                                where: { id: 'consensus' }, include: { votes: true }});

                            it('it should not change the current round', () => {
                                expect(votedTask.currentRound).toBe(currentRound);
                            });
                            describe('it should set', () => {
                                it('the tasks status to finished', () => {
                                    expect(votedTask.active).toBe(false);
                                    expect(votedTask.finished).toBe(true);
                                });
                                it('the tasks points to the the most picked option', () => {
                                    expect(votedTask.points).toBe(points);
                                });
                            });
                        });
                        describe('but a consensus is not to be reached', () => {
                            describe('and the current round is not the last possible', async () => {
                                await voteFunction('rounds_left', userEmail, points);
                                const votedTask = await prisma.task.findUniqueOrThrow({
                                    where: { id: 'rounds_left' }, include: { votes: true }});
                                it('should increment the current round by one', () => {
                                    expect(votedTask.currentRound).toBe(currentRound + 1);
                                });
                                describe('it should not change', () => {
                                    it('the tasks status', () => expect(votedTask.active).toBe(true));
                                    it('the tasks points', () => expect(votedTask.points).toBeNull());
                                });
                            });
                            describe('and the current round is the last possible', async () => {
                                await voteFunction('max_rounds', userEmail, points);
                                const votedTask = await prisma.task.findUniqueOrThrow({
                                    where: { id: 'max_rounds' }, include: { votes: true }});
                                it('it should not change the current round', () => {
                                    expect(votedTask.currentRound).toBe(currentRound);
                                });
                                it('the tasks status to finished', () => {
                                    expect(votedTask.active).toBe(false);
                                    expect(votedTask.finished).toBe(true);
                                });
                                it('the tasks points to the the most picked option', () => {
                                    expect(votedTask.points).toBe(80);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

describe('The "validatePoints" function', () => {
    it('should return void if the number is a non negative integer', () => {
        expect(validatePoints(3)).toBeUndefined();
        expect(validatePoints(0)).toBeUndefined();
    });
    it('should throw an error if the number is not an integer', () => {
        expect(() => validatePoints(.3)).toThrow();
    });
    it('should throw an error if the number is negative', () => {
        expect(() => validatePoints(-1)).toThrow();
        expect(() => validatePoints(-0.5)).toThrow();
    });
});

describe('The "calcFinalPoints" function', () => {
    const votes: Vote[] = [
        { createdAt: now, points: 1, round: 1, user: { email: '' }},
        { createdAt: now, points: 1, round: 1, user: { email: '' }},
        { createdAt: now, points: 1, round: 1, user: { email: '' }},
        { createdAt: now, points: 2, round: 1, user: { email: '' }},
        { createdAt: now, points: 2, round: 1, user: { email: '' }},
    ];
    const currentRound = 1;
    describe('if a consensus has been reached', () => {
        it('should return the points that have been picked most often', () => {
            expect(calcFinalPoints(votes, currentRound, 2, .6)).toBe(1);
        });
    });
    describe('if a consensus has not been reached', () => {
        it('and the max number of rounds was reached, should return the points that were picked most often', () => {
            expect(calcFinalPoints(votes, currentRound, 1, .8)).toBe(1);
        });
        it('and the max number of rounds was not reached, should return undefined', () => {
            expect(calcFinalPoints(votes, currentRound, 2, .8)).toBeUndefined();
        });
    });
});
