import roomService from "#/services/room.service.js";
import { NextFunction, Request, Response } from "express";
import { CreateRoomSchema } from "@repo/shared";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = CreateRoomSchema.safeParse(req.body);
    if (!validated.success) {
      res.status(400).json({ errors: validated.error.flatten() });
      return;
    }

    const hostId = req.user?.id;
    if (!hostId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
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
      res.status(400).json({ message: "Code missing" });
      return;
    }

    const room = await roomService.getByCode(code);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

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
      res.status(400).json({ message: "Id missing" });
      return;
    }

    const room = await roomService.getById(id);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
