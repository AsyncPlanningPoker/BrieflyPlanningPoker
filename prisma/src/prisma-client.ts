import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()
.$extends({
    result: {
        user: {
            password: {
                needs: {},
                compute() {
                    return undefined;
                }
            }
        }
    }
});