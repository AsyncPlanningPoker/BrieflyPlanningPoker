import { mockDeep, mockReset } from 'vitest-mock-extended'
import { PrismaExtended } from '../prisma-client';
import { Prisma } from '@prisma/client';
    
const prisma = mockDeep<PrismaExtended>();

const taskWithRelations = Prisma.validator<Prisma.TaskDefaultArgs>()({
    include: {
        votes: { select: { createdAt: true, points: true, round: true, user: { select: { email: true }}}},
        messages: { select: { createdAt: true, message: true, round: true, user: { select: { email: true }}}},
        squad: { select: { users: { select: { user: { select: { email: true }}}}}
    }}});

export type TaskWithRelations = Prisma.TaskGetPayload<typeof taskWithRelations>;

const tasks = new Map<string, TaskWithRelations>();
const aggFields = ['votes', 'messages'];

prisma.$transaction.mockImplementation(async data => await data(prisma));

prisma.task.findUniqueOrThrow.mockImplementation(({ where, include, select }) => {
    if(! where.id) throw new Error("ID can't be undefined");
    let retTask = tasks.get(where.id);
    if(! retTask) throw new Error(`Can't find task with id ${where.id}`);
    retTask = structuredClone(retTask);
    if(include)
        for(const key of aggFields)
            if(!(key in include)) delete retTask[key as keyof typeof retTask];

    if(select)
        for(const key in retTask)
            if(!(key in aggFields) && !(key in select)) delete retTask[key as keyof typeof retTask];
    
    return retTask as any;
});

prisma.task.update.mockImplementation(({ data, where }) => {
    if(! where.id) throw new Error("ID can't be undefined");
    const retTask = tasks.get(where.id);
    if(! retTask) throw new Error(`Can't find task with id ${where.id}`);

    const newVote = data.votes?.create as any;
    const newMessage = data.messages?.create as any;

    if(newVote){
        retTask.votes = retTask.votes.concat({
            createdAt: new Date(),
            points: newVote.points,
            round: newVote.round,
            user: { email: newVote.user.connect.email }
        });
    }

    if(newMessage){
        retTask.messages = retTask.messages.concat({
            createdAt: new Date(),
            message: newMessage.message,
            round: newMessage.round,
            user: { email: newMessage.user.connect.email }
        });
    }

    const increment = (data.currentRound as any)?.increment ?? 0;
    retTask.active = (data.active ?? retTask.active) as boolean;
    retTask.description = (data.description ?? retTask.description) as string;
    retTask.enabled = (data.enabled ?? retTask.enabled) as boolean;
    retTask.finished = (data.finished ?? retTask.finished) as boolean;
    retTask.name = (data.name ?? retTask.name) as string;
    retTask.updatedAt = new Date();
    retTask.currentRound += increment;
    retTask.points = (data.points ?? retTask.points) as number | null;
    return retTask as any;
});

export function loadTasks(tasksToLoad: TaskWithRelations[]): void {
    for(const task of tasksToLoad) tasks.set(task.id, task)
}

export function clearDb(): void { tasks.clear() };

export default prisma;