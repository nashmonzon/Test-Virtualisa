import { Request, Response } from "express";
// import { errorHandler } from "../middleware/errorHandler";
import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

exports.assignVehicleToDriver = async (
  req: Request<any, any, { driverId: number; vehicleId: number }>,
  res: Response
) => {
  const { driverId, vehicleId } = req.body;

  try {
    const driver = await prisma.driver.findUnique({ where: { id: driverId } });
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!driver || !vehicle) {
      res.status(404).json({ message: "Driver or vehicle not found" });
      return;
    }

    await prisma.driverVehicle.create({
      data: {
        driverId,
        vehicleId,
      },
    });

    console.log(res);

    res
      .status(200)
      .json({ message: "Vehicle assigned to driver successfully" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
