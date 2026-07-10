-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AlbumCategory" AS ENUM ('TOURNAMENTS', 'TRAININGS', 'SOCIALS', 'AWARDS');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('INTERNAL_HOST', 'EXTERNAL_MAJOR', 'RECURRING_LOOP');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('REGISTRATION_OPEN', 'REGISTRATION_LOCKED', 'COMPLETED', 'ONGOING', 'CLOSING_SOON');

-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID');

-- CreateEnum
CREATE TYPE "RegistrationType" AS ENUM ('NONE', 'INDIVIDUAL', 'TEAM');

-- CreateEnum
CREATE TYPE "AdjudicatorPolicy" AS ENUM ('N_PLUS_ONE', 'FIXED', 'NONE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isStaff" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToGroup" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "UserToGroup_pkey" PRIMARY KEY ("userId","groupId")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "AlbumCategory" NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "dateString" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "institutions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "cloudinaryFolder" TEXT NOT NULL,
    "photoCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentConfig" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL,
    "statusText" TEXT NOT NULL,
    "scopeText" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "debateFormat" TEXT NOT NULL,
    "deliveryMode" "DeliveryMode" NOT NULL DEFAULT 'OFFLINE',
    "location" TEXT NOT NULL,
    "dateString" TEXT NOT NULL,
    "sortDate" TIMESTAMP(3) NOT NULL,
    "deadlineText" TEXT,
    "registrationUrl" TEXT,
    "registrationType" "RegistrationType" NOT NULL DEFAULT 'NONE',
    "adjudicatorPolicy" "AdjudicatorPolicy" NOT NULL DEFAULT 'NONE',
    "fixedAdjudicatorCount" INTEGER,
    "whoShouldAttend" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "schedule" JSONB NOT NULL,
    "faqs" JSONB NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRegistration" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "player1Name" TEXT NOT NULL,
    "player1Email" TEXT NOT NULL,
    "player2Name" TEXT NOT NULL,
    "player2Email" TEXT NOT NULL,
    "accommodations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdjudicatorRegistration" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accommodations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdjudicatorRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualRegistration" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "accommodations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IndividualRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "Album"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Album_cloudinaryFolder_key" ON "Album"("cloudinaryFolder");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentConfig_slug_key" ON "TournamentConfig"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRegistration_tournamentId_teamName_key" ON "TeamRegistration"("tournamentId", "teamName");

-- CreateIndex
CREATE UNIQUE INDEX "AdjudicatorRegistration_tournamentId_email_key" ON "AdjudicatorRegistration"("tournamentId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "IndividualRegistration_tournamentId_email_key" ON "IndividualRegistration"("tournamentId", "email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- AddForeignKey
ALTER TABLE "UserToGroup" ADD CONSTRAINT "UserToGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToGroup" ADD CONSTRAINT "UserToGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRegistration" ADD CONSTRAINT "TeamRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdjudicatorRegistration" ADD CONSTRAINT "AdjudicatorRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualRegistration" ADD CONSTRAINT "IndividualRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentConfig"("id") ON DELETE CASCADE ON UPDATE CASCADE;
