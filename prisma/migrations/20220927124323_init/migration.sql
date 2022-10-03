/*
  Warnings:

  - You are about to drop the column `postedById` on the `Flashcard` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_postedById_fkey";

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "postedById";
