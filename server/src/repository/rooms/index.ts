import { count, desc, eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import type {
	CreateRoom,
	CreateRoomQuestion,
	DeleteRoom,
	GetByQuestionId,
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
	const { roomId, limit } = args;

	const result = await db
		.select({
			id: schema.questions.id,
			question: schema.questions.question,
			answer: schema.questions.answer,
			createdAt: schema.questions.createdAt,
		})
		.from(schema.questions)
		.where(eq(schema.questions.roomId, roomId))
		.orderBy(desc(schema.questions.createdAt))
		.limit(limit ?? 10);

	return result;
};

export const createQuestion = async (args: CreateRoomQuestion.Args) => {
	const { roomId, question, answer } = args;

	const result = await db
		.insert(schema.questions)
		.values({
			question,
			roomId,
			answer,
		})
		.returning();

	return result;
};

export const getQuestionById = async (
	args: GetByQuestionId.Args,
): Promise<GetByQuestionId.Response> => {
	const { id } = args;

	const result = await db
		.select({
			id: schema.questions.id,
		})
		.from(schema.questions)
		.where(eq(schema.questions.id, id))
		.limit(1);

	const question = result[0];

	return {
		id: question.id,
	};
};

export const deleteQuestion = async (args: DeleteRoom.Args) => {
	const { id } = args;

	const result = await db
		.delete(schema.questions)
		.where(eq(schema.questions.id, id))
		.returning();

	return result;
};
