import { Vehicle } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type VehicleRequestBody = Omit<Vehicle, "id">;
exports.createVehicle = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { domain, brand, model, mileage, status } = req.body;
  console.log(domain, brand, model, mileage, status);
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        domain,
        brand,
        model,
        mileage,
        status,
      },
    });
    res.status(200).json(vehicle);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getVehicles = async (
  _req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  try {
    const vehicle = await prisma.vehicle.findMany();
    res.status(200).json(vehicle);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
