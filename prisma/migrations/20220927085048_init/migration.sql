/*
  Warnings:

  - Added the required column `query` to the `Flashcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "query" TEXT NOT NULL;
