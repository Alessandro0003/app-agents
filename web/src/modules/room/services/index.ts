import { api } from "@/services";

import type { CreateRoom, GetRoom } from "./types";

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
