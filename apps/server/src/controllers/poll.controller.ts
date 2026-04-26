import pollService from "#/services/poll.service.js";
import { AppError } from "#/utils/AppError.js";
import { CreatePollSchema } from "@repo/shared";
import { NextFunction, Request, Response } from "express";

export const createPoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = CreatePollSchema.safeParse(req.body);
    if (!validated.success) {
      throw new AppError("Invalid input data", 400, validated.error.flatten());
    }

    const hostId = req.user?.id as string;
    if (!hostId) {
      throw new AppError("Unauthorized", 401);
    }

    const roomId = req.params.roomId as string;
    if (!roomId) {
      throw new AppError("Room ID is required", 400);
    }

    const poll = await pollService.create(
      roomId,
      hostId,
      validated.data.question,
      validated.data.options,
    );

    res.status(201).json(poll);
  } catch (err) {
    next(err);
  }
};

export const launchPoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = req.params.roomId as string;
    if (!roomId) {
      throw new AppError("Room ID is required", 400);
    }

    const hostId = req.user?.id as string;
    if (!hostId) {
      throw new AppError("Unauthorized", 401);
    }

    const pollId = req.params.id as string;
    if (!pollId) {
      throw new AppError("Poll Id is requred", 400);
    }

    const poll = await pollService.launch(roomId, hostId, pollId);

    res.status(200).json(poll);
  } catch (err) {
    next(err);
  }
};

export const closePoll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = req.params.roomId as string;
    if (!roomId) {
      throw new AppError("Room ID is required", 400);
    }

    const hostId = req.user?.id as string;
    if (!hostId) {
      throw new AppError("Unauthorized", 401);
    }

    const pollId = req.params.id as string;
    if (!pollId) {
      throw new AppError("Poll ID is required", 400);
    }

    const poll = await pollService.close(roomId, hostId, pollId);

    res.status(200).json(poll);
  } catch (err) {
    next(err);
  }
};

export const getPollById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roomId = req.params.roomId as string;
    if (!roomId) {
      throw new AppError("Room ID is required", 400);
    }

    const pollId = req.params.id as string;
    if (!pollId) {
      throw new AppError("Poll ID is required", 400);
    }

    const currentUserId = req.user?.id as string | undefined;

    const poll = await pollService.getById(roomId, pollId, currentUserId);

    res.status(200).json(poll);
  } catch (err) {
    next(err);
  }
};
