import { PrismaClient, Prisma } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends({
    // query: {
    //     user: {
    //         async update({ model, operation, args, query }){
    //             return query(args);
    //         }
    //     }
    // }
});