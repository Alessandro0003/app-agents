import { useCreateRoomQuestion } from "@/modules/room/hooks/mutation";
import type { Room } from "@/modules/room/schemas";
import { QuestionForm, useQuestionForm } from "../components/form";
import type { QuestionFormOutput } from "../components/form/types";

interface CreateQuestionContainersProps {
	roomId: Room["id"];
	addOptimistic: (text: string) => string; // retorna tempId
	mergeOptimistic: (
		tempId: string,
		real: { id: string; answer?: string; createdAt?: string },
	) => void;
}

export const CreateQuestionContainers = (
	props: CreateQuestionContainersProps,
) => {
	const { roomId, mergeOptimistic, addOptimistic } = props;

	const form = useQuestionForm({
		defaultValues: {
			question: "",
		},
	});

	const { mutate: createQuestion, isPending: isSubmitting } =
		useCreateRoomQuestion({
			onSuccess: () => form.reset(),
		});

	const handleSubmit = (data: QuestionFormOutput) => {
		const tempId = addOptimistic(data.question);

		createQuestion(
			{ roomId, question: data.question },
			{
				onSuccess: (api) => {
					// adapte se o payload vier com outro shape
					mergeOptimistic(tempId, {
						id: api.id,
						answer: api.answer,
						createdAt: api.createdAt,
					});
				},
				onError: () => {
					// erro? remove sem “travada”
					mergeOptimistic(tempId, { id: `discard-${tempId}` });
					// (se preferir, crie um removeOptimistic direto)
				},
			},
		);
	};

	return (
		<div>
			<QuestionForm
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				{...form}
			/>
		</div>
	);
};
