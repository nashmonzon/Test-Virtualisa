/*
  Warnings:

  - You are about to drop the `driver_vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "driver_vehicle" DROP CONSTRAINT "driver_vehicle_driverId_fkey";

-- DropForeignKey
ALTER TABLE "driver_vehicle" DROP CONSTRAINT "driver_vehicle_vehicleId_fkey";

-- DropTable
DROP TABLE "driver_vehicle";

-- CreateTable
CREATE TABLE "_DriverToVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DriverToVehicle_AB_unique" ON "_DriverToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_DriverToVehicle_B_index" ON "_DriverToVehicle"("B");

-- AddForeignKey
ALTER TABLE "_DriverToVehicle" ADD CONSTRAINT "_DriverToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DriverToVehicle" ADD CONSTRAINT "_DriverToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
