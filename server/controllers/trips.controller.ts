import { Prisma, Trip, Vehicle } from "@prisma/client";
import { Request, Response } from "express";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

type TripsRequestBody = Omit<Trip, "id">;

type AssignVehicleRequestBody = {
  driverId: number;
  vehicleId: number;
  distance: number;
};

exports.createTrip = async (
  req: Request<any, any, AssignVehicleRequestBody>,
  res: Response
) => {
  const { driverId, vehicleId, distance } = req.body;
  const startDate = new Date();

  try {
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      include: { vehicles: true },
    });

    if (
      !driver ||
      !driver.vehicles.some((vehicle: Vehicle) => vehicle.id === vehicleId)
    ) {
      return res
        .status(400)
        .json({ error: "Driver is not associated with the vehicle" });
    }
    const trip = await prisma.trip.create({
      data: {
        driverId,
        vehicleId,
        distance,
        startDate,
        endDate: startDate,
      },
    });

    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        kilometers: { increment: distance },
      },
    });

    await prisma.driver.update({
      where: { id: driverId },
      data: {
        kilometers: { increment: distance },
      },
    });

    const response = {
      trip: trip,
      status: 200,
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

exports.getTrips = async (
  _req: Request<any, any, TripsRequestBody>,
  res: Response
) => {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        driver: true,
        vehicle: true,
      },
    });

    const response = {
      count: trips.length,
      trips: trips,
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
