/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `debt` DROP FOREIGN KEY `Debt_borrowId_fkey`;

-- DropForeignKey
ALTER TABLE `debt` DROP FOREIGN KEY `Debt_lendId_fkey`;

-- AlterTable
ALTER TABLE `debt` MODIFY `lendId` VARCHAR(191) NOT NULL,
    MODIFY `borrowId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `discordId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`discordId`);

-- AddForeignKey
ALTER TABLE `Debt` ADD CONSTRAINT `Debt_lendId_fkey` FOREIGN KEY (`lendId`) REFERENCES `User`(`discordId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Debt` ADD CONSTRAINT `Debt_borrowId_fkey` FOREIGN KEY (`borrowId`) REFERENCES `User`(`discordId`) ON DELETE RESTRICT ON UPDATE CASCADE;
