import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CreateRoomForm, useCreateRoomForm } from "../components/form";
import type { CreateRoomOutput } from "../components/form/types";
import { useCreateRoom } from "../hooks/mutation";

export const CreateRoomContainers = () => {
	const form = useCreateRoomForm({
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { mutate: createRoom } = useCreateRoom({
		onSuccess: () => form.reset(),
	});

	const handleSubmit = (data: CreateRoomOutput) => createRoom(data);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Criar Sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber respostas
					da I.A
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CreateRoomForm onSubmit={handleSubmit} {...form} />
			</CardContent>
		</Card>
	);
};
