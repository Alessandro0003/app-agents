import { api } from "@/services";

import type {
	AudioUpload,
	CreateRoom,
	CreateRoomQuestion,
	DeleteQuestion,
	GetRoom,
	GetRoomQuestions,
} from "./types";

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

export const createRoomQuestion = async (
	args: CreateRoomQuestion.Args,
): Promise<CreateRoomQuestion.Response> => {
	const { roomId, ...data } = args;

	const result = await api.post(`/rooms/${roomId}/questions`, data);

	return result.data.data;
};

export const audioUpload = async (
	args: AudioUpload.Args,
): Promise<AudioUpload.Response> => {
	const { roomId, audio } = args;

	const formData = new FormData();
	formData.append("file", audio, "audio.webm");

	const response = await api.post(`/rooms/${roomId}/audio`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data.data;
};

export const deleteQuestion = async (args: DeleteQuestion.Args) => {
	const { questionId } = args;
	return await api
		.delete(`/rooms/questions/${questionId}`)
		.then((res) => res.data.data);
};
