import type { FastifyReply } from "fastify";
import * as services from "../services/rooms/index.ts";
import type {
	CreateRoomQuestionRequest,
	CreateRoomRequest,
	GetRoomQuestionRequest,
	GetRoomsRequest,
} from "./types.ts";

export const getRooms = async (
	_request: GetRoomsRequest,
	reply: FastifyReply,
) => {
	const result = await services.getRooms();

	return reply.status(200).send({
		statusCode: 200,
		message: "Rooms retrieved successfully",
		data: result,
	});
};

export const createRoom = async (
	request: CreateRoomRequest,
	reply: FastifyReply,
) => {
	const { name, description } = request.body;

	const result = await services.createRoom({ name, description });

	return reply.status(201).send({
		statusCode: 201,
		message: "Room created successfully",
		data: result,
	});
};

export const getRoomQuestion = async (
	request: GetRoomQuestionRequest,
	reply: FastifyReply,
) => {
	const { roomId } = request.params;

	const result = await services.getRoomQuestion({ roomId });

	return reply.status(200).send({
		statusCode: 200,
		message: "Questions retrieved successfully",
		data: result,
	});
};

export const createRoomQuestion = async (
	request: CreateRoomQuestionRequest,
	reply: FastifyReply,
) => {
	const { roomId } = request.params;
	const { question } = request.body;

	const result = await services.createRoomQuestion({ roomId, question });

	return reply.status(201).send({
		statusCode: 201,
		message: "Question created successfully",
		data: result,
	});
};
