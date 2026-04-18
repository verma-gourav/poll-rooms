import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err.stack);

  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
