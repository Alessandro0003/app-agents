import { createMutation } from "@/hooks/mutations";
import {
	audioUpload,
	createRoom,
	createRoomQuestion,
	deleteQuestion,
	deleteRoom,
} from "../services";

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

export const useDeleteQuestion = createMutation({
	key: ["delete-question"],
	mutationFn: deleteQuestion,
	messages: {
		onError: () => "Erro ao excluir pergunta",
		onMutate: () => "Excluindo pergunta...",
		onSuccess: () => "Pergunta excluída com sucesso",
	},
	invalidate: [{ queryKey: ["get-questions"] }],
});

export const useDeleteRoom = createMutation({
	key: ["delete-room"],
	mutationFn: deleteRoom,
	messages: {
		onError: () => "Erro ao excluir sala",
		onMutate: () => "Excluindo sala...",
		onSuccess: () => "Sala excluída com sucesso",
	},
	invalidate: [{ queryKey: ["get-room"] }],
})
