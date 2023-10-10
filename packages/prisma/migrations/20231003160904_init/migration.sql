-- CreateTable
CREATE TABLE "Squad" (
    "id" UUID NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "currentMaxRounds" INTEGER NOT NULL,
    "currentPercentual" DECIMAL(14,2) NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Squad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnSquads" (
    "userId" UUID NOT NULL,
    "squadId" UUID NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSquads_pkey" PRIMARY KEY ("userId","squadId")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" UUID NOT NULL,
    "squadId" UUID NOT NULL,
    "name" VARCHAR(85) NOT NULL,
    "description" VARCHAR(300),
    "maxRounds" INTEGER NOT NULL,
    "percentual" DECIMAL(14,2) NOT NULL,
    "points" INTEGER,
    "finished" BOOLEAN DEFAULT false,
    "active" BOOLEAN DEFAULT true,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesOnTasks" (
    "taskId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "currentRound" INTEGER NOT NULL,
    "message" VARCHAR(180) NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessagesOnTasks_pkey" PRIMARY KEY ("taskId","userId")
);

-- CreateTable
CREATE TABLE "PointsOnTasks" (
    "taskId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "currentRound" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsOnTasks_pkey" PRIMARY KEY ("taskId","userId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "enabled" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UsersOnSquads" ADD CONSTRAINT "UsersOnSquads_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnSquads" ADD CONSTRAINT "UsersOnSquads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesOnTasks" ADD CONSTRAINT "MessagesOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessagesOnTasks" ADD CONSTRAINT "MessagesOnTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsOnTasks" ADD CONSTRAINT "PointsOnTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsOnTasks" ADD CONSTRAINT "PointsOnTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
