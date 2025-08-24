import { count,eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import type {
	CreateRoom,
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
