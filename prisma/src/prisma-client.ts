import { PrismaClient, Prisma } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends({
    query: {
        $allModels: {
            async update({ model, operation, args, query }){
                args.data.updatedAt = new Date();
                if("id" in args.data) throw new Error("CANT UPDATE ID");
                return query(args);
            },

            // async create({ model, operation, args, query }){
            //     if("id" in args.data){
            //         args.data.id
            //     }
            //     return query(args);
            // }
        }
    }
});