import { createQuery } from "@/hooks/queries";
import { getRoom, getRoomQuestions } from "../services";

export const useGetRoom = createQuery({
	queryKey: ["get-room"],
	queryFn: getRoom,
});

export const useGetRoomQuestions = createQuery({
	queryKey: ["get-questions"],
	queryFn: getRoomQuestions,
});
