/*
  Warnings:

  - You are about to drop the column `name` on the `score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_league,id_sport]` on the table `sports_league` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_league,id_sport_custom]` on the table `sports_league` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `leagues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sports_league" DROP CONSTRAINT "sports_league_id_sport_fkey";

-- AlterTable
ALTER TABLE "leagues" ADD COLUMN     "description" TEXT,
ADD COLUMN     "maxteams" INTEGER NOT NULL DEFAULT 16,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "score" DROP COLUMN "name",
ADD COLUMN     "draws" INTEGER,
ADD COLUMN     "loses" INTEGER,
ADD COLUMN     "matches" INTEGER,
ADD COLUMN     "points" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "wins" INTEGER;

-- AlterTable
ALTER TABLE "sports" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "sports_custom" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "sports_league" ADD COLUMN     "id_sport_custom" INTEGER,
ALTER COLUMN "id_sport" DROP NOT NULL;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id_image" SERIAL NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER,
    "id_league" INTEGER,
    "id_team" INTEGER,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id_image")
);

-- CreateTable
CREATE TABLE "default_images" (
    "id_default_image" SERIAL NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "default_images_pkey" PRIMARY KEY ("id_default_image")
);

-- CreateTable
CREATE TABLE "matches" (
    "id_match" SERIAL NOT NULL,
    "id_team_one" INTEGER NOT NULL,
    "id_team_two" INTEGER NOT NULL,
    "match_date" TIMESTAMP(3) NOT NULL,
    "sport" TEXT NOT NULL,
    "winner" INTEGER,
    "loser" INTEGER,
    "draw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id_match")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateIndex
CREATE INDEX "images_id_user_idx" ON "images"("id_user");

-- CreateIndex
CREATE INDEX "images_id_league_idx" ON "images"("id_league");

-- CreateIndex
CREATE INDEX "images_id_team_idx" ON "images"("id_team");

-- CreateIndex
CREATE INDEX "idx_team_one" ON "matches"("id_team_one");

-- CreateIndex
CREATE INDEX "idx_team_two" ON "matches"("id_team_two");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "sports_league_id_league_id_sport_key" ON "sports_league"("id_league", "id_sport");

-- CreateIndex
CREATE UNIQUE INDEX "sports_league_id_league_id_sport_custom_key" ON "sports_league"("id_league", "id_sport_custom");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_id_league_fkey" FOREIGN KEY ("id_league") REFERENCES "leagues"("id_league") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "teams"("id_team") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_id_team_one_fkey" FOREIGN KEY ("id_team_one") REFERENCES "teams"("id_team") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_id_team_two_fkey" FOREIGN KEY ("id_team_two") REFERENCES "teams"("id_team") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_league" ADD CONSTRAINT "sports_league_id_sport_fkey" FOREIGN KEY ("id_sport") REFERENCES "sports"("id_sport") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sports_league" ADD CONSTRAINT "sports_league_id_sport_custom_fkey" FOREIGN KEY ("id_sport_custom") REFERENCES "sports_custom"("id_sport_custom") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
