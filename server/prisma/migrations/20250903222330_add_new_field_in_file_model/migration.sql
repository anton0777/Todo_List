-- AlterTable
ALTER TABLE `File` ADD COLUMN `status` ENUM('processing', 'ready', 'failed') NOT NULL DEFAULT 'processing';
