import { Prisma, PrismaClient } from '@prisma/client';
import taskExtensions from './extensions/models/task';

// const tasksWithVotes = Prisma.validator<Prisma.TaskDefaultArgs>()({include: { votes: {
//     select: { user: { select: {email: true} }, points: true, createdAt: true, round: true }
// } }});
// type TasksWithVotes = Prisma.TaskGetPayload<typeof tasksWithVotes>

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
.$extends({
    query: {
        task: {
            async create({ model, operation, args, query }){
                const { maxRounds, percentual } = await prisma.squad
                .findUniqueOrThrow({
                    select: { maxRounds: true, percentual:true },
                    where: { id: args.data.squadId }
                });
                
                args.data.maxRounds ??= maxRounds;
                args.data.percentual ??= percentual;

                return query(args);
            }   
        }
    }
})
.$extends(taskExtensions);

export default prisma;