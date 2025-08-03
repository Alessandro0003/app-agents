import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import type {
	AudioChunks,
	CreateRoom,
	CreateRoomQuestion,
	GetRoomQuestion,
} from "./types.ts";

export const getRooms = async () => {
	const result = await db
		.select({
			id: schema.rooms.id,
			name: schema.rooms.name,
			createdAt: schema.rooms.createdAt,
			questionsCount: count(schema.questions.id),
		})
		.from(schema.rooms)
		.leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
		.groupBy(schema.rooms.id)
		.orderBy(schema.rooms.createdAt);

	return result;
};

export const createRoom = async (args: CreateRoom.Args) => {
	const { name, description } = args;

	const result = await db
		.insert(schema.rooms)
		.values({
			name,
			description,
		})
		.returning();

	return result;
};

export const getRoomQuestion = async (args: GetRoomQuestion.Args) => {
	const { roomId } = args;

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
};

export const createQuestion = async (args: CreateRoomQuestion.Args) => {
	const { roomId, question } = args;

	const result = await db
		.insert(schema.questions)
		.values({
			question,
			roomId,
		})
		.returning();

	return result;
};

export const audioChunk = async (args: AudioChunks.Args) => {
	const { roomId, embeddings, transcription } = args;

	const result = await db
		.insert(schema.audioChunks)
		.values({
			roomId,
			transcription,
			embeddings,
		})
		.returning();

	return result;
};
