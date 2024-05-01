import { Driver, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type DriverRequestBody = Omit<Driver, "id">;
exports.createDriver = async (
  req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  const { firstName, lastName, dni, licenseExpiry, licenseType } = req.body;

  try {
    const driver = await prisma.driver.create({
      data: {
        firstName,
        lastName,
        dni,
        licenseExpiry,
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
      if (error.code === "P2002") res.status(400).send("Driver already exists");
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
    const drivers = await prisma.driver.findMany();
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
