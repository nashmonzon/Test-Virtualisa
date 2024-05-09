/*
  Warnings:

  - You are about to drop the column `licenseExpiry` on the `driver` table. All the data in the column will be lost.
  - Added the required column `licenseIssuedDate` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driver" DROP COLUMN "licenseExpiry",
ADD COLUMN     "licenseIssuedDate" TIMESTAMP(3) NOT NULL;
