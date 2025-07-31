import { z } from "zod";

export const schemaRoom = z.object({
	id: z.string().uuid(),
	name: z.string(),
	questionsCount: z.coerce.number(),
	createdAt: z.coerce.date(),
});

export type Room = z.infer<typeof schemaRoom>;
