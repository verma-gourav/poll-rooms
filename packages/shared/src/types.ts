import { z } from "zod";

export const CreateRoomSchema = z.object({
  title: z.string().min(3).max(30),
});

export const CreatePollSchema = z.object({
  question: z.string().min(5),
  options: z.array(z.string().min(1)).min(2).max(5),
});

export type CreateRoomInput = z.infer<typeof CreateRoomSchema>;
export type CreatePollInput = z.infer<typeof CreatePollSchema>;
