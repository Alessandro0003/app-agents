import { pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";

export const audioChunks = pgTable("audio_chunks", {
	id: uuid().primaryKey().defaultRandom(),
	transcription: text().notNull(),
	embeddings: vector({ dimensions: 768 }).notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
