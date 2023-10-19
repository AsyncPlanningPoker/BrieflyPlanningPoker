import { Prisma } from "@prisma/client";

export type PrismaClient = Parameters<Extract<Parameters<typeof Prisma.defineExtension>[0], (arg: any) => any>>[0]
export type PrismaTransactionClient = Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0];