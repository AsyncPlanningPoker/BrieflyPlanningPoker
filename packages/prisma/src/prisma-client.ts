import { Prisma, PrismaClient } from '@prisma/client';
import taskExtensions from './extensions/models/task';
import * as crypt from './extensions/crypt'

// const tasksWithVotes = Prisma.validator<Prisma.TaskDefaultArgs>()({include: { votes: {
//     select: { user: { select: {email: true} }, points: true, createdAt: true, round: true }
// } }});
// type TasksWithVotes = Prisma.TaskGetPayload<typeof tasksWithVotes>

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
.$extends({
    query: {
        task: {
            async create({ args, query }){
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
.$extends(taskExtensions)
.$extends({
    model: {
        user:{
            /** 
             * Authenticate an user
             * @param email The user e-mail
             * @param password The user password
             * @returns {boolean}
             */
            async authenticate(email: string, password: string): Promise<boolean>{
                const user = await Prisma.getExtensionContext(this)
                    .$parent.user.findUniqueOrThrow({ where: { email } });
                
                return crypt.compare(password, user.password);
            }
        }
    }
})
.$extends({
    result: {
        user: {
            password: {
                needs: {},
                compute(){
                    return undefined
                }
            }
        }
    },
    query: {
        user: {
            async $allOperations({ args, query }){
                const data = await query(args);
                if(! data) return undefined;

                if (data instanceof Object && 'password' in data)
                    delete data.password;
                else if (data instanceof Array)
                    for(const datum of data)
                        if('password' in datum) delete datum.password;  

                return data;
            }
        }
    }
});

export default prisma;