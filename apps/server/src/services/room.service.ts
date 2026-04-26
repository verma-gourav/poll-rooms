import { AppError } from "#/utils/AppError.js";
import { prisma } from "@repo/db";
import { nanoid } from "nanoid";

const create = async (title: string, hostId: string) => {
  const room = await prisma.room.create({
    data: {
      title,
      code: nanoid(6).toUpperCase(),
      hostId,
    },
  });

  return room;
};

const getByCode = async (code: string) => {
  const room = await prisma.room.findUnique({
    where: { code },
  });

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  return room;
};

const getById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
  });

  if (!room) {
    throw new AppError("Room not found", 404);
  }

  return room;
};

export default { create, getByCode, getById };
