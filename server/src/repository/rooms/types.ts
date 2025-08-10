export namespace GetRoomQuestion {
	export type Args = {
		roomId: string;
	};
}

export namespace CreateRoom {
	export type Args = {
		name: string;
		description: string;
	};
}

export namespace CreateRoomQuestion {
	export type Args = {
		roomId: string;
		question: string;
		answer?: string;
	};
}

export namespace AudioChunks {
	export type Args = {
		roomId: string;
		transcription: string;
		embeddings: number[];
	};
}
