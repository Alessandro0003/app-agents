import { desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schemas/index.ts";
import {
	type GetRoomsQuestionsParams,
	getRoomsQuestionsSchema,
} from "../schemas/rooms/index.ts";

export const getRoomsQuestions: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/rooms/:roomId/questions",
		{ schema: getRoomsQuestionsSchema },
		async (request) => {
			const { roomId } = request.params as GetRoomsQuestionsParams;

			const result = await db
				.select({
					id: schema.questions.id,
					question: schema.questions.question,
					answer: schema.questions.answer,
					createdAt: schema.questions.createdAt,
				})
				.from(schema.questions)
				.where(eq(schema.questions.roomId, roomId))
				.orderBy(desc(schema.questions.createdAt));

			return result;
		},
	);
};
