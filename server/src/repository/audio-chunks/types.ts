export namespace CreateAudioChunks {
	export type Args = {
		transcription: string;
		embeddings: number[];
	};
}

export namespace GetAudioChunks {
	export type Args = {
		embeddings: number[];
	};

	export type Response = {
		id: string;
		transcription: string;
		similarity: number;
	};
}
