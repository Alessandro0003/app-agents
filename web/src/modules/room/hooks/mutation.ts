import { createMutation } from "@/hooks/mutations";
import { createRoom } from "../services";

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
