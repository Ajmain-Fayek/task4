/*
  Warnings:

  - Added the required column `userId` to the `userActivities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userVerification" DROP CONSTRAINT "userVerification_userId_fkey";

-- AlterTable
ALTER TABLE "userActivities" ADD COLUMN     "userId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "userActivities" ADD CONSTRAINT "userActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userVerification" ADD CONSTRAINT "userVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
