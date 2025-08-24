export namespace GetRoomQuestion {
	export type Args = {
		roomId: string;
		limit?: number;
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

export namespace DeleteQuestion {
	export type Args = {
		questionId: string;
	};
}

export namespace DeleteRoom {
	export type Args = {
		roomId: string;
	};
}
