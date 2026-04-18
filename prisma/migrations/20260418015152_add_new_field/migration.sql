-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "goalStatus" "GoalStatus" DEFAULT 'ACTIVE';
