import type { Question } from "@/modules/question/schemas";
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

export namespace GetRoomQuestions {
	export type Args = {
		roomId: Question["roomId"];
	};

	export type Response = {
		id: Question["id"];
		question: Question["question"];
		answer?: Question["answer"];
		createdAt: Question["createdAt"];
	}[];
}

export namespace CreateRoomQuestion {
	export type Args = {
		roomId: Room["id"];
		question: Question["question"];
	};

	export type Response = {
		questionId: Question["id"];
	};
}

export namespace AudioUpload {
	export type Args = {
		roomId: Room["id"];
		audio: Blob;
	};

	export type Response = {};
}
