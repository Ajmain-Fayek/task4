-- CreateTable
CREATE TABLE "userVerification" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userVerification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userVerification_userId_key" ON "userVerification"("userId");

-- AddForeignKey
ALTER TABLE "userVerification" ADD CONSTRAINT "userVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
