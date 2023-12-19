import { afterEach } from "vitest";
import prisma from "./packages/prisma/src";
afterEach(async () => {
    await prisma.$transaction([
        prisma.task.deleteMany(),
        prisma.squad.deleteMany(),
        prisma.user.deleteMany(),
    ]);
});