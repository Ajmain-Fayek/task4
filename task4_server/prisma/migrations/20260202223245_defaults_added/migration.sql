/*
  Warnings:

  - The primary key for the `userVerification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `userVerification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "userActivities" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "activeTime" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "userVerification" DROP CONSTRAINT "userVerification_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "userVerification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
