import * as repository from "../../repository/rooms/index.ts";
import type {
	AudioChunks,
	CreateRoom,
	CreateRoomQuestion,
	GetRoomQuestion,
} from "./types.ts";

export const getRooms = async () => {
	const result = await repository.getRooms();

	return result;
};

export const createRoom = async (args: CreateRoom.Args) => {
	const { name, description } = args;

	const result = await repository.createRoom({ name, description });

	const insertedRoom = result[0];

	if (!insertedRoom) {
		throw new Error("Failed to create room");
	}

	return {
		roomId: insertedRoom.id,
	};
};

export const getRoomQuestion = async (args: GetRoomQuestion.Args) => {
	const { roomId } = args;

	const result = await repository.getRoomQuestion({ roomId });

	if (!result) {
		throw new Error("Room not found");
	}

	return result;
};

export const createRoomQuestion = async (args: CreateRoomQuestion.Args) => {
	const { roomId, question } = args;

	const result = await repository.createQuestion({ roomId, question });

	const insertedQuestion = result[0];

	return {
		questionId: insertedQuestion.id,
	};
};

export const audioChunks = async (args: AudioChunks.Args) => {
	const { roomId, embeddings, transcription } = args;

	const result = await repository.audioChunk({
		roomId,
		transcription,
		embeddings,
	});

	const chunk = result[0];

	if (!chunk) {
		throw new Error("Failed to save audio chunk");
	}

	return {
		chunkId: chunk.id,
	};
};
