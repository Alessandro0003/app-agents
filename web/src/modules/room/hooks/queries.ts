import { createQuery } from "@/hooks/queries";
import { getRoom, getRoomQuestions } from "../services";

export const useGetRoom = createQuery({
	queryKey: ["getRoom"],
	queryFn: getRoom,
});

export const useGetRoomQuestions = createQuery({
	queryKey: ["getRoomQuestions"],
	queryFn: getRoomQuestions,
});
