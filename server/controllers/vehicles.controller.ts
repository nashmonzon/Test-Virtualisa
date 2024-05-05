import { Prisma, Vehicle, VehicleStatus } from "@prisma/client";

import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type VehicleRequestBody = Omit<Vehicle, "id">;
exports.createVehicle = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { domain, brand, model } = req.body;
  try {
    const vehicle = await prisma.vehicle.create({
      data: {
        domain,
        brand,
        model,
        mileage: 0,
        status: VehicleStatus.AVAILABLE,
      },
    });
    const response = {
      vehicle: vehicle,
      status: 200,
    };
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
    const vehicles = await prisma.vehicle.findMany({
      include: {
        drivers: true,
      },
    });
    const response = {
      count: vehicles.length,
      vehicles: vehicles,
      status: 200,
    };
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getVehicle = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: Number(id) },
      include: {
        drivers: true,
      },
    });
    const response = {
      driver: vehicle,
      status: 200,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getVehiclesWithoutDriver = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        NOT: {
          drivers: {
            some: {
              id: parseInt(id),
            },
          },
        },
      },
    });
    const response = {
      count: vehicles.length,
      vehicles: vehicles,
      status: 200,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
