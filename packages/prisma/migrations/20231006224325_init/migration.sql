/*
  Warnings:

  - You are about to drop the column `currentRound` on the `MessagesOnTasks` table. All the data in the column will be lost.
  - You are about to drop the column `enabled` on the `MessagesOnTasks` table. All the data in the column will be lost.
  - The primary key for the `PointsOnTasks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentRound` on the `PointsOnTasks` table. All the data in the column will be lost.
  - You are about to drop the column `enabled` on the `PointsOnTasks` table. All the data in the column will be lost.
  - You are about to drop the column `currentMaxRounds` on the `Squad` table. All the data in the column will be lost.
  - You are about to drop the column `currentPercentual` on the `Squad` table. All the data in the column will be lost.
  - Made the column `updatedAt` on table `MessagesOnTasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `MessagesOnTasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `PointsOnTasks` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `PointsOnTasks` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `maxRounds` to the `Squad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentual` to the `Squad` table without a default value. This is not possible if the table is not empty.
  - Made the column `enabled` on table `Squad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Squad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Squad` required. This step will fail if there are existing NULL values in that column.
  - Made the column `finished` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enabled` on table `UsersOnSquads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `UsersOnSquads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `UsersOnSquads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MessagesOnTasks" DROP COLUMN "currentRound",
DROP COLUMN "enabled",
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PointsOnTasks" DROP CONSTRAINT "PointsOnTasks_pkey",
DROP COLUMN "currentRound",
DROP COLUMN "enabled",
ADD COLUMN     "round" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL,
ADD CONSTRAINT "PointsOnTasks_pkey" PRIMARY KEY ("taskId", "userId", "round");

-- AlterTable
ALTER TABLE "Squad" DROP COLUMN "currentMaxRounds",
DROP COLUMN "currentPercentual",
ADD COLUMN     "maxRounds" INTEGER NOT NULL,
ADD COLUMN     "percentual" DECIMAL(14,2) NOT NULL,
ALTER COLUMN "enabled" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "currentRound" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "maxRounds" SET DEFAULT 0,
ALTER COLUMN "percentual" SET DEFAULT 0,
ALTER COLUMN "finished" SET NOT NULL,
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "enabled" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "enabled" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "UsersOnSquads" ALTER COLUMN "enabled" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET NOT NULL;
