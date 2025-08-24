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
	DeleteQuestionRequest,
	DeleteRoomRequest,
	GetRoomQuestionRequest,
	GetRoomsRequest,
	UploadAudioRequest,
} from "./types.ts";

export const getRooms = async (
	_request: GetRoomsRequest,
	reply: FastifyReply,
) => {
	try {
		const result = await services.getRooms();

		return reply.status(200).send({
			statusCode: 200,
			message: "Rooms retrieved successfully",
			data: result,
		});

	} catch (error) {
		let message: string = "Error retrieving rooms";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const createRoom = async (
	request: CreateRoomRequest,
	reply: FastifyReply,
) => {
	try {
		const { 
			body: { name, description } 
		} = request;

		const result = await services.createRoom({ name, description });

		return reply.status(201).send({
			statusCode: 201,
			message: "Room created successfully",
			data: result,
		});

	} catch (error) {
		let message: string = "Error creating room";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const getRoomQuestion = async (
	request: GetRoomQuestionRequest,
	reply: FastifyReply,
) => {
	try {
		
		const { 
			// @ts-ignore
			params: { roomId },
			// @ts-ignore
			query: { limit },
		} = request;
		
		const result = await services.getRoomQuestion({ roomId, limit });

		return reply.status(200).send({
			statusCode: 200,
			message: "Questions retrieved successfully",
			data: result,
		});

	} catch (error) {
		let message: string = "Error retrieving room questions";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const createRoomQuestion = async (
	request: CreateRoomQuestionRequest,
	reply: FastifyReply,
) => {
	try {
		const {
			body: { question },
			params: { roomId },
		} = request;

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

	} catch (error) {
		let message: string = "Error creating room question";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
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

export const deleteQuestion = async (
	request: DeleteQuestionRequest,
	reply: FastifyReply,
) => {
	try {
		const { questionId } = request.params;

		await services.deleteQuestion({ questionId });

		return reply.status(200).send({
			statusCode: 200,
			message: "Question deleted successfully",
		});
	} catch (error) {
		let message: string = "Error deleting question";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
};

export const deleteRoom = async (
	request: DeleteRoomRequest,
	reply: FastifyReply,
) => {
	try {
		const { 
			params: { roomId },
		} = request;

		const room = await services.deleteRoom({ roomId });

		if (!room) {
			return reply.status(404).send({
				statusCode: 404,
				message: "Room not found",
			});
		}

		return reply.status(200).send({
			statusCode: 200,
			message: "Room deleted successfully",
		});

	} catch (error) {
		let message: string = "Error deleting room";

		if (error instanceof Error) {
			message = error.message;
		}

		return reply.status(500).send({
			statusCode: 500,
			message,
		});
	}
}
