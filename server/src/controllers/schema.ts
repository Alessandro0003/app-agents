import { z } from "zod";

export const getRoomsSchema = z.object({});

export const createRoomSchema = z.object({
	body: z.object({
		name: z.string().min(1),
		description: z.string().min(1),
	}),
});

export const getRoomQuestionSchema = z.object({
	params: z.object({
		roomId: z.string().uuid(),
	}),
});

export const createQuestionsSchema = z.object({
	params: z.object({
		roomId: z.string().uuid(),
	}),
	body: z.object({
		question: z.string().min(1, "Question is required"),
	}),
});

export const uploadAudioSchema = z.object({
	params: z.object({}),
});

export const deleteQuestionSchema = z.object({
	params: z.object({
		questionId: z.string().uuid(),
	}),
});
