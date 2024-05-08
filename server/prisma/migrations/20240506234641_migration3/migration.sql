/*
  Warnings:

  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `day` to the `price` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_vehicleId_fkey";

-- AlterTable
ALTER TABLE "price" ADD COLUMN     "day" INTEGER NOT NULL,
ALTER COLUMN "pricePerKm" SET DEFAULT 0.0;

-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "serviceCount" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "service";
