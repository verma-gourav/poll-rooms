import roomService from "#/services/room.service.js";
import { NextFunction, Request, Response } from "express";
import { CreateRoomSchema } from "@repo/shared";
import { AppError } from "#/utils/AppError.js";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = CreateRoomSchema.safeParse(req.body);
    if (!validated.success) {
      throw new AppError("Invalid input data", 400, validated.error.flatten());
    }

    const hostId = req.user?.id as string;
    if (!hostId) {
      throw new AppError("Unauthorized", 401);
    }

    const room = await roomService.create(validated.data.title, hostId);

    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRoomByCode = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const code = req.params.code as string;
    if (!code) {
      throw new AppError("Code missing", 400);
    }

    const room = await roomService.getByCode(code);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    if (!id) {
      throw new AppError("Id missing", 400);
    }

    const room = await roomService.getById(id);

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
