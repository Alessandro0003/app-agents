import { createMutation } from "@/hooks/mutations";
import { audioUpload, createRoom, createRoomQuestion } from "../services";

export const useCreateRoom = createMutation({
	key: ["createRoom"],
	mutationFn: createRoom,
	messages: {
		onError: () => "Erro ao criar sala",
		onMutate: () => "Criando sala...",
		onSuccess: () => "Sala criada com sucesso",
	},
	invalidate: [{ queryKey: ["get-room"] }],
});

export const useCreateRoomQuestion = createMutation({
	key: ["createRoomQuestion"],
	mutationFn: createRoomQuestion,
	messages: {
		onError: () => "Erro ao criar pergunta",
		onMutate: () => "Criando pergunta...",
		onSuccess: () => "Pergunta criada com sucesso",
	},
	invalidate: [{ queryKey: ["get-questions"] }],
});

export const useAudioUpload = createMutation({
	key: ["audioUpload"],
	mutationFn: audioUpload,
	messages: {
		onError: () => "Erro ao enviar áudio",
		onMutate: () => "Enviando áudio...",
		onSuccess: () => "Áudio enviado com sucesso",
	},
	invalidate: [{ queryKey: ["get-room"] }],
});
