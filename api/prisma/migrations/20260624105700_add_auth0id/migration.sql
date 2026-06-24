/*
  Warnings:

  - A unique constraint covering the columns `[auth0id]` on the table `players` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0id` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "auth0id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "players_auth0id_key" ON "players"("auth0id");
