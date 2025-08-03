import { useGetRoomQuestions } from "@/modules/room/hooks/queries";
import type { Room } from "@/modules/room/schemas";
import { QuestionItemContainers } from "./question-item-containers";

interface QuestionListContainersProps {
	roomId: Room["id"];
}

export const QuestionListContainers = (props: QuestionListContainersProps) => {
	const { roomId } = props;

	const { data } = useGetRoomQuestions({
		roomId,
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">
					Perguntas & Respostas
				</h2>
			</div>

			{data?.map((question) => (
				<QuestionItemContainers key={question.id} question={question} />
			))}
		</div>
	);
};
