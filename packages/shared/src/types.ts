import { z } from "zod";

export const CreateRoomSchema = z.object({
  title: z.string().min(3).max(30),
});

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;
