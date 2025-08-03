export namespace CreateAudioChunks {
	export type Args = {
		roomId: string;
		transcription: string;
		embeddings: number[];
	};
}

export namespace GetAudioChunks {
	export type Args = {
		roomId: string;
		embeddings: number[];
	};

	export type Response = {
		id: string;
		transcription: string;
		similarity: number;
	};
}
