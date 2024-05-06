/*
  Warnings:

  - You are about to drop the column `mileage` on the `vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "mileage",
ADD COLUMN     "kilometers" INTEGER NOT NULL DEFAULT 0;
