import { Driver, LicenseType, Prisma } from "@prisma/client";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type PricePerKmRequestBody = {
  pricePerKm: number;
};

exports.createPrice = async (
  req: Request<any, any, PricePerKmRequestBody>,
  res: Response
) => {
  const { pricePerKm } = req.body;

  if (!pricePerKm) {
    return res.status(400).json({ error: "PricePerKm is required" });
  }
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  try {
    const price = await prisma.price.create({
      data: {
        pricePerKm,
        day,
        month,
        year,
      },
    });

    const response = {
      count: price.length,
      price: price,
      status: 201,
    };
    res.status(201).json(response);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  return;
};

exports.getPrice = async (
  _req: Request<any, any, PricePerKmRequestBody>,
  res: Response
) => {
  try {
    const price = await prisma.price.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const response = {
      price,
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

exports.getPrices = async (
  _req: Request<any, any, PricePerKmRequestBody>,
  res: Response
) => {
  try {
    const price = await prisma.price.findMany();
    const response = {
      price,
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

exports.gatStats = async (
  _req: Request<any, any, PricePerKmRequestBody>,
  res: Response
) => {
  try {
    const lastPrice = await prisma.price.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const price = lastPrice ? lastPrice.pricePerKm : 0;
    const trips = await prisma.trip.findMany();

    const repairVehicleCount = await prisma.vehicle.count({
      where: {
        status: "IN_REPAIR",
      },
    });

    const drivers = await prisma.driver.findMany();

    let unableToDriveCount = 0;
    drivers.forEach((driver: Driver) => {
      const status = getLicenseStatus(
        new Date(driver.licenseIssuedDate),
        driver.licenseType
      );
      if (status === "PROHIBITED") {
        unableToDriveCount++;
      }
    });

    const response = {
      lastPrice: price,
      trips,
      repairVehicleCount,
      unableToDriveCount,
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

  return;
};

export function getLicenseStatus(
  licenseIssuedDate: Date,
  licenseType: LicenseType
): string {
  const currentDate = new Date();
  const differenceInMilliseconds =
    currentDate.getTime() - licenseIssuedDate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  let status = "";
  if (licenseType === "PERSONAL") {
    if (differenceInDays > 365) {
      // Si han pasado más de 365 días desde la emisión
      status = "PROHIBITED";
    } else {
      status = "ALLOWED";
    }
  } else if (licenseType === "PROFESSIONAL") {
    if (differenceInDays > 365 * 5) {
      // Si han pasado más de 5 años (365 días * 5) desde la emisión
      status = "PROHIBITED";
    } else {
      status = "ALLOWED";
    }
  }
  return status;
}
