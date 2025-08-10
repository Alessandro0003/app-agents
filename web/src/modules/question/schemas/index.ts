import { z } from "zod";

export const questionSchema = z.object({
	id: z.string().uuid(),
	roomId: z.string().uuid().optional(),
	question: z
		.string()
		.min(1, "Pergunta é obrigatória")
		.min(10, "Pergunta deve ter pelo menos 10 caracteres")
		.max(500, "Pergunta deve ter no máximo 500 caracteres"),
	answer: z.string().optional(),
	createdAt: z.string(),
	isGeneratingAnswer: z.boolean().optional(),
});

export type Question = z.infer<typeof questionSchema>;
