/*
  Warnings:

  - Added the required column `isPayOff` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `debt` ADD COLUMN `isPayOff` BOOLEAN NOT NULL;
