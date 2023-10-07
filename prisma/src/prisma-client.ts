import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends({
    query: {
        vote: {
            async create({ model, operation, args, query }){
                
                const { currentRound } = await prisma.task.findUniqueOrThrow({
                    select: { currentRound: true },
                    where: { id: args.data.taskId }
                });
                args.data.round ??= currentRound;
                
                return query(args);
            }   
        },
        message: {
            async create({ model, operation, args, query }){
                const { currentRound } = await prisma.task.findUniqueOrThrow({
                    select: { currentRound: true },
                    where: { id: args.data.taskId }
                });
                args.data.round ??= currentRound;
                const result = await query(args);
                /** 
                 ** Implantar logica de verificacao de termino de rodada e votacao
                */
                return result;
            }   
        },
        task: {
            async create({ model, operation, args, query }){
                const { maxRounds, percentual } = await prisma.squad.findUniqueOrThrow({
                    select: {
                        maxRounds: true,
                        percentual: true
                    },
                    where: { id: args.data.squadId }
                });

                args.data.maxRounds ??= maxRounds;
                args.data.percentual ??= percentual;

                return query(args);
            }   
        }
    }
});