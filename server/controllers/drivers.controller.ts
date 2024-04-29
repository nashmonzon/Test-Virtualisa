import { Driver } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
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
    res.status(200).json(driver);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.getDrivers = async (
  _req: Request<any, any, DriverRequestBody>,
  res: Response
) => {
  try {
    const drivers = await prisma.driver.findMany();
    res.status(200).json(drivers);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
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
  console.log(typeof id);
  try {
    const driver = await prisma.driver.findUnique({
      where: { id: Number(id) },
      include: {
        vehicles: true,
      },
    });

    res.status(200).json(driver);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
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
    if (error instanceof PrismaClientValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
