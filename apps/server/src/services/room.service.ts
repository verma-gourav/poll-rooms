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

  return room;
};

const getById = async (id: string) => {
  const room = await prisma.room.findUnique({
    where: { id },
  });

  return room;
};

export default { create, getByCode, getById };
