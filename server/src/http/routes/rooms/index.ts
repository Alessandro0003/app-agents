import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as controllers from "../../../controllers/index.ts";
import {
	createQuestionsSchema,
	createRoomSchema,
	deleteQuestionSchema,
	getRoomQuestionSchema,
	getRoomsSchema,
	uploadAudioSchema,
	deleteRoomSchema,
} from "../../../controllers/schema.ts";

export const roomsRoute: FastifyPluginAsync = async (app) => {
	const route = app.withTypeProvider<ZodTypeProvider>();

	route.get("/rooms", { schema: getRoomsSchema }, controllers.getRooms);

	route.get(
		"/rooms/:roomId/questions",
		{ schema: getRoomQuestionSchema },
		controllers.getRoomQuestion,
	);

	route.post("/rooms", { schema: createRoomSchema }, controllers.createRoom);

	route.post(
		"/rooms/:roomId/questions",
		{ schema: createQuestionsSchema },
		controllers.createRoomQuestion,
	);

	route.post(
		"/rooms/:roomId/audio",
		{ schema: uploadAudioSchema },
		controllers.uploadAudio,
	);

	route.delete(
		"/rooms/questions/:questionId",
		{ schema: deleteQuestionSchema },
		controllers.deleteQuestion,
	);

	route.delete(
		"/rooms/:roomId",
		{ schema: deleteRoomSchema },
		controllers.deleteRoom,
	)
};
