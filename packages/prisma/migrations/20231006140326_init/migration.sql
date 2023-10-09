/*
  Warnings:

  - The primary key for the `MessagesOnTasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PointsOnTasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `MessagesOnTasks` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MessagesOnTasks" DROP CONSTRAINT "MessagesOnTasks_pkey",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "MessagesOnTasks_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PointsOnTasks" DROP CONSTRAINT "PointsOnTasks_pkey",
ADD CONSTRAINT "PointsOnTasks_pkey" PRIMARY KEY ("taskId", "userId", "currentRound");
