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
        kilometers: 0,
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
      res.status(404).send("A vehicle with this domain already exists");
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return;
};

exports.getVehicles = async (
  _req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        drivers: true,
        trips: true,
      },
    });
    const response = {
      count: vehicles.length,
      vehicles: vehicles,
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
        trips: true,
      },
    });
    const response = {
      driver: vehicle,
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

export const getVehiclesWithoutDriver = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { id } = req.params;

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

export const repairVehicle = async (
  req: Request<any, any, VehicleRequestBody>,
  res: Response
) => {
  const { vehicleId } = req.params;
  console.log(vehicleId, req.params);

  try {
    const vehicles = await prisma.vehicle.update({
      where: { id: Number(vehicleId) },
      data: {
        status: "AVAILABLE",
      },
    });

    console.log(vehicles);
    const response = {
      success: true,
      status: 200,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
