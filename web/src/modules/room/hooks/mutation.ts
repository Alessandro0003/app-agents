import { createMutation } from "@/hooks/mutations";
import { createRoom, createRoomQuestion } from "../services";

export const useCreateRoom = createMutation({
	key: ["createRoom"],
	mutationFn: createRoom,
	messages: {
		onError: () => "Erro ao criar sala",
		onMutate: () => "Criando sala...",
		onSuccess: () => "Sala criada com sucesso",
	},
	invalidate: [{ queryKey: ["getRoom"] }],
});

export const useCreateRoomQuestion = createMutation({
	key: ["createRoomQuestion"],
	mutationFn: createRoomQuestion,
	messages: {
		onError: () => "Erro ao criar pergunta",
		onMutate: () => "Criando pergunta...",
		onSuccess: () => "Pergunta criada com sucesso",
	},
	invalidate: [{ queryKey: ["getRoomQuestions"] }],
});
