import { Driver, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type DriverRequestBody = Omit<Driver, "id">;
type AssignVehicleRequestBody = {
  driverId: number;
  vehicleId: number;
};
exports.createDriver = async (
  req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  const { firstName, lastName, dni, licenseIssuedDate, licenseType } = req.body;

  try {
    const driver = await prisma.driver.create({
      data: {
        firstName,
        lastName,
        dni,
        licenseIssuedDate,
        licenseType,
      },
    });
    const response = {
      driver: driver,
      status: 200,
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send("Driver already exists");
    } else {
      res.status(500).json({ error: `${error}` });
    }
  }
};

exports.getDrivers = async (
  _req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  try {
    const drivers = await prisma.driver.findMany({
      include: {
        vehicles: true,
        trips: true,
      },
    });
    const response = {
      count: drivers.length,
      drivers: drivers,
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

exports.getDriver = async (
  req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const driver = await prisma.driver.findUnique({
      where: { id: Number(id) },
      include: {
        vehicles: true,
        trips: true,
      },
    });
    const response = {
      driver: driver,
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

exports.deleteAllDriver = async (
  _req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  try {
    const drivers = await prisma.driver.deleteMany();
    res.status(200).json(drivers);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.assignVehicleToDriver = async (
  req: Request<any, any, AssignVehicleRequestBody>,
  res: Response
) => {
  const { driverId, vehicleId } = req.body;

  try {
    const existingAssignment = await prisma.driver.findFirst({
      where: {
        id: driverId,
        vehicles: { some: { id: vehicleId } },
      },
    });

    if (existingAssignment) {
      res.status(404).send("Driver already has this vehicle assigned");
      return;
    }

    await prisma.driver.update({
      where: { id: driverId },
      data: {
        vehicles: { connect: { id: vehicleId } },
      },
    });

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        drivers: { connect: { id: driverId } },
      },
    });

    const response = {
      message: "Vehicle assigned to driver successfully",
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

exports.getDriversWithVehicles = async (
  _req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  try {
    const driversWithVehicles = await prisma.driver.findMany({
      where: {
        vehicles: {
          some: {},
        },
      },
      include: {
        vehicles: true,
      },
    });

    const response = {
      count: driversWithVehicles.length,
      drivers: driversWithVehicles,
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
