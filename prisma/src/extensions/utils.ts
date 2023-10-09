import { Prisma } from "@prisma/client";

export type prismaClientType = Parameters<Extract<Parameters<typeof Prisma.defineExtension>[0], (arg: any) => any>>[0]