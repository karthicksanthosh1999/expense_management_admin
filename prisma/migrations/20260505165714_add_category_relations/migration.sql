-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('ON_TRACK', 'WARNING', 'EXCEEDED');

-- CreateTable
CREATE TABLE "Budgets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "period" TEXT NOT NULL,
    "status" "BudgetStatus" NOT NULL DEFAULT 'ON_TRACK',
    "alert" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Budgets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Budgets_userId_idx" ON "Budgets"("userId");

-- AddForeignKey
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
