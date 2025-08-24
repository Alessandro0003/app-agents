export namespace CreateRoom {
	export type Args = {
		name: string;
		description: string;
	};
}

export namespace DeleteRoom {
	export type Args = {
		roomId: string;
	};
}
