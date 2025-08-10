import type { FastifyReply } from "fastify";
import {
	generateAnswer,
	generateEmbeddings,
	transcribeAudio,
} from "../I.A/gemini.ts";
import * as audioChunksServices from "../services/audio-chunks/index.ts";
import * as services from "../services/rooms/index.ts";
import type {
	CreateRoomQuestionRequest,
	CreateRoomRequest,
	GetRoomQuestionRequest,
	GetRoomsRequest,
	UploadAudioRequest,
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

	const embeddings = await generateEmbeddings(question);

	const chunks = await audioChunksServices.getAudioChunks({
		embeddings,
	});

	let answer: string | undefined;

	if (chunks.length > 0) {
		const transcriptions = chunks.map((chunk) => chunk.transcription);

		answer = await generateAnswer(question, transcriptions);
	}

	const result = await services.createRoomQuestion({
		roomId,
		question,
		answer,
	});

	return reply.status(201).send({
		statusCode: 201,
		message: "Question created successfully",
		data: result,
	});
};

export const uploadAudio = async (
	request: UploadAudioRequest,
	reply: FastifyReply,
) => {
	try {
		const audio = await request.file();

		if (!audio) {
			throw new Error("Audio file is required");
		}

		const audioBuffer = await audio.toBuffer();
		const audioAsBase64 = audioBuffer.toString("base64");

		// Transcrever o audio
		const transcription = await transcribeAudio(audioAsBase64, audio.mimetype);

		// Gerar o vetor semântico / embeddings
		const embeddings = await generateEmbeddings(transcription);

		// Armazena os vetores no banco de dados
		const chunk = await audioChunksServices.createAudioChunks({
			transcription,
			embeddings,
		});

		return reply.status(201).send({
			statusCode: 201,
			message: "Audio uploaded and transcribed successfully",
			data: chunk,
		});
	} catch (error) {
		let message: string = "Error processing audio upload";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};
