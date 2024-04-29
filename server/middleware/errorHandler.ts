import { NextFunction, Request, Response } from "express";

// Global error handler middleware
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next?: NextFunction
) => {
  res.status(500);
  res.render("error", { error: err });
};
