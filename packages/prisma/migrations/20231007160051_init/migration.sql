/*
  Warnings:

  - You are about to drop the `MessagesOnTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PointsOnTasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessagesOnTasks" DROP CONSTRAINT "MessagesOnTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "MessagesOnTasks" DROP CONSTRAINT "MessagesOnTasks_userId_fkey";

-- DropForeignKey
ALTER TABLE "PointsOnTasks" DROP CONSTRAINT "PointsOnTasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "PointsOnTasks" DROP CONSTRAINT "PointsOnTasks_userId_fkey";

-- DropTable
DROP TABLE "MessagesOnTasks";

-- DropTable
DROP TABLE "PointsOnTasks";

-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "taskId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 0,
    "message" VARCHAR(180) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "taskId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("taskId","userId","round")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
