import { z } from "zod/v4";

export const getRoomsQuestionsSchema = z.object({
	params: z.object({
		roomId: z.string().uuid(),
	}),
});

export type GetRoomsQuestionsParams = z.infer<
	typeof getRoomsQuestionsSchema
>["params"];

export const createRoomSchema = z.object({
	body: z.object({
		name: z.string().min(1),
		description: z.string().optional(),
	}),
});

export type CreateRoomBody = z.infer<typeof createRoomSchema>["body"];
