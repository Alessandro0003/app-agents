import { useCreateRoomQuestion } from "@/modules/room/hooks/mutation";
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

	const { mutate: createQuestion } = useCreateRoomQuestion({
		onSuccess: () => form.reset(),
	});

	const handleSubmit = (data: QuestionFormOutput) =>
		createQuestion({
			roomId,
			question: data.question,
		});

	return (
		<div>
			<QuestionForm onSubmit={handleSubmit} {...form} />
		</div>
	);
};
