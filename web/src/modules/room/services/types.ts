import type { Room } from "../schemas";

export namespace GetRoom {
	export type Args = {};

	export type Response = Room[];
}

export namespace CreateRoom {
	export type Args = {
		name: string;
		description?: string;
	};

	export type Response = {
		roomId: Room["id"];
	};
}
