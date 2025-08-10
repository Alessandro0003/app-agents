export namespace CreateAudioChunks {
	export type Args = {
		// roomId: string;
		transcription: string;
		embeddings: number[];
	};
}

export namespace GetAudioChunck {
	export type Args = {
		embeddings: number[];
	};

	export type Response = {
		id: string;
		transcription: string;
		similarity: number;
	};
}
