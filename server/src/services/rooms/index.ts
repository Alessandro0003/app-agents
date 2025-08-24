import * as repository from "../../repository/rooms/index.ts";
import * as repositoryQuestions from "../../repository/questions/index.ts";
import type {
	CreateRoom,
	CreateRoomQuestion,
	DeleteQuestion,
	GetRoomQuestion,
	DeleteRoom
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
	const { roomId, limit } = args;

	const questions = await repositoryQuestions.getQuestions({ roomId, limit });

	if (!questions) {
		throw new Error("Questoins not found in this room");
	}

	return questions;
};

export const createRoomQuestion = async (args: CreateRoomQuestion.Args) => {
	const { roomId, question, answer } = args;

	const result = await repositoryQuestions.createQuestion({ roomId, question, answer });

	const insertedQuestion = result[0];

	return {
		questionId: insertedQuestion.id,
		answer,
	};
};

export const deleteQuestion = async (args: DeleteQuestion.Args) => {
	const { questionId } = args;

	const question = await repositoryQuestions.deleteQuestion({ id: questionId });

	if (question.length === 0) {
		throw new Error("Question not exists");
	}

	return question;
};

export const deleteRoom = async (args: DeleteRoom.Args) => {
	const { roomId } = args;
	
	const room = await repository.deleteRoom({ roomId });

	return room;
}
