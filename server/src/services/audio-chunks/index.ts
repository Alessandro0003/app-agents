import * as repository from "../../repository/audio-chunks/index.ts";
import type { CreateAudioChunks, GetAudioChunck } from "./types.ts";

export const createAudioChunks = async (args: CreateAudioChunks.Args) => {
	const { roomId, embeddings, transcription } = args;

	const result = await repository.createAudioChunks({
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

export const getAudioChunks = async (args: GetAudioChunck.Args) => {
	const { roomId, embeddings } = args;

	const chunks = await repository.getAudioChunks({ roomId, embeddings });

	return chunks;
};
