import type { FastifyRequest } from "fastify";
import type { z } from "zod";
import type * as schemas from "./schema.ts";

export type GetRoomsRequest = FastifyRequest<{
	Params: typeof schemas.getRoomsSchema;
}>;

export type CreateRoomRequest = FastifyRequest<{
	Body: z.infer<typeof schemas.createRoomSchema>["body"];
}>;

export type GetRoomQuestionRequest = FastifyRequest<{
	//@ts-ignore
	Params: z.infer<typeof schemas.getRoomQuestionSchema>["params"];
	//@ts-ignore
	Querystring: z.infer<typeof schemas.getRoomQuestionSchema>["querystring"];
}>;

export type CreateRoomQuestionRequest = FastifyRequest<{
	Params: z.infer<typeof schemas.createQuestionsSchema>["params"];
	Body: z.infer<typeof schemas.createQuestionsSchema>["body"];
}>;

export type UploadAudioRequest = FastifyRequest<{
	Params: z.infer<typeof schemas.uploadAudioSchema>["params"];
}>;

export type DeleteQuestionRequest = FastifyRequest<{
	Params: z.infer<typeof schemas.deleteQuestionSchema>["params"];
}>;

export type DeleteRoomRequest = FastifyRequest<{
	Params: z.infer<typeof schemas.deleteRoomSchema>["params"];
}>
