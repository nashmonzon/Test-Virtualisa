import { Prisma } from "@prisma/client";
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
      price: price,
      status: 201,
    };
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
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
    console.log(error);
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
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
