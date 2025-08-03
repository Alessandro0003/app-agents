import { api } from "@/services";

import type { CreateRoom, GetRoom, GetRoomQuestions } from "./types";

export const getRoom = async (): Promise<GetRoom.Response> => {
	return await api.get("/rooms").then((res) => res.data.data);
};

export const createRoom = async (
	args: CreateRoom.Args,
): Promise<CreateRoom.Response> => {
	const { ...data } = args;

	const result = await api.post("/rooms", data);

	return result.data.data;
};

export const getRoomQuestions = async (
	args: GetRoomQuestions.Args,
): Promise<GetRoomQuestions.Response> => {
	const { roomId } = args;

	return await api
		.get(`/rooms/${roomId}/questions`)
		.then((res) => res.data.data);
};
