import type { Room } from "@/modules/room/schemas";
import { QuestionForm, useQuestionForm } from "../components/form";
import type { QuestionFormOutput } from "../components/form/types";

interface CreateQuestionContainersProps {
	roomId: Room["id"];
}

export const CreateQuestionContainers = (
	props: CreateQuestionContainersProps,
) => {
	const { roomId } = props;

	const form = useQuestionForm({
		defaultValues: {
			question: "",
		},
	});

	const handleSubmit = (data: QuestionFormOutput) =>
		console.log(data, "Room ID:", roomId);

	return (
		<div>
			<QuestionForm onSubmit={handleSubmit} {...form} />
		</div>
	);
};
