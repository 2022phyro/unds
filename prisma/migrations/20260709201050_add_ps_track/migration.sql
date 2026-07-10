/*
  Warnings:

  - You are about to drop the column `accommodations` on the `AdjudicatorRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `accommodations` on the `IndividualRegistration` table. All the data in the column will be lost.
  - You are about to drop the column `accommodations` on the `TeamRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdjudicatorRegistration" DROP COLUMN "accommodations";

-- AlterTable
ALTER TABLE "IndividualRegistration" DROP COLUMN "accommodations";

-- AlterTable
ALTER TABLE "TeamRegistration" DROP COLUMN "accommodations";

-- AlterTable
ALTER TABLE "TournamentConfig" ADD COLUMN     "includesPS" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "psAdjudicatorsAllowed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "PSRegistration" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PSRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSAdjudicatorRegistration" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PSAdjudicatorRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PSRegistration_tournamentId_email_key" ON "PSRegistration"("tournamentId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "PSAdjudicatorRegistration_tournamentId_email_key" ON "PSAdjudicatorRegistration"("tournamentId", "email");

-- AddForeignKey
ALTER TABLE "PSRegistration" ADD CONSTRAINT "PSRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PSAdjudicatorRegistration" ADD CONSTRAINT "PSAdjudicatorRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
