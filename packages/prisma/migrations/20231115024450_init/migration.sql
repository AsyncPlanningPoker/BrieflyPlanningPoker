/*
  Warnings:

  - You are about to alter the column `percentual` on the `Squad` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `DoublePrecision`.
  - You are about to alter the column `percentual` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Squad" ALTER COLUMN "percentual" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "percentual" SET DATA TYPE DOUBLE PRECISION;
