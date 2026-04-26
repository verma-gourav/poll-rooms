import { AppError } from "#/utils/AppError.js";
import { Prisma, prisma } from "@repo/db";

const verifyHostAccess = async (roomId: string, hostId: string) => {
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) {
    throw new AppError("Room not found", 404);
  }

  if (room.hostId !== hostId) {
    throw new AppError("Forbidden", 403);
  }

  return room;
};

const create = async (
  roomId: string,
  hostId: string,
  question: string,
  options: string[],
) => {
  await verifyHostAccess(roomId, hostId);

  const poll = await prisma.poll.create({
    data: {
      roomId,
      question,
      options: {
        create: options.map((text) => ({ text })),
      },
    },
    include: { options: true },
  });

  return poll;
};

const launch = async (roomId: string, hostId: string, pollId: string) => {
  await verifyHostAccess(roomId, hostId);

  try {
    const launchedPoll = await prisma.poll.update({
      where: {
        id: pollId,
        roomId,
      },
      data: {
        status: "ACTIVE",
      },
    });

    return launchedPoll;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        throw new AppError(
          "Cannot launch poll. Another poll is currently active.",
          409,
        );
      }
    }
    throw err;
  }
};

const close = async (roomId: string, hostId: string, pollId: string) => {
  await verifyHostAccess(roomId, hostId);

  try {
    const closedPoll = await prisma.poll.update({
      where: {
        id: pollId,
        roomId,
      },
      data: {
        status: "CLOSED",
      },
    });

    return closedPoll;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        throw new AppError("Poll not found in this room", 404);
      }
    }

    throw err;
  }
};

const getById = async (
  roomId: string,
  pollId: string,
  currentUserId?: string,
) => {
  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: { options: true, room: true },
  });

  if (!poll || poll.roomId !== roomId) {
    throw new AppError("Poll not found", 404);
  }

  const isHost = poll.room.hostId === currentUserId;
  if (!isHost && poll.status === "DRAFT") {
    throw new AppError("This poll has not been launched yet.", 403);
  }

  const { room, ...pollData } = poll;
  return pollData;
};

export default { create, launch, close, getById };
