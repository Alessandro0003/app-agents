import { z } from "zod";

export const schemaRoom = z.object({
	id: z.string().uuid(),
	name: z.string().min(3, { message: "Inclua no minimo 3 caracteres" }),
	description: z.string().optional(),
	questionsCount: z.coerce.number(),
	createdAt: z.coerce.date(),
});

export type Room = z.infer<typeof schemaRoom>;
