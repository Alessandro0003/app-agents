import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schemas/index.ts";
import type { CreateAudioChunks, GetAudioChunks } from "./types.ts";

export const createAudioChunks = async (args: CreateAudioChunks.Args) => {
	const { embeddings, transcription } = args;

	const result = await db
		.insert(schema.audioChunks)
		.values({
			transcription,
			embeddings,
		})
		.returning();

	return result;
};

export const getAudioChunks = async (args: GetAudioChunks.Args) => {
	const { embeddings } = args;

	const embeddingsAsString = `[${embeddings.join(", ")}]`;

	const chunks = await db
		.select({
			id: schema.audioChunks.id,
			transcription: schema.audioChunks.transcription,
			similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
		})
		.from(schema.audioChunks)
		.where(
			and(
				eq(schema.audioChunks.id, schema.audioChunks.id),
				sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`,
			),
		)
		.orderBy(
			sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`,
		)
		.limit(3);

	return chunks;
};
