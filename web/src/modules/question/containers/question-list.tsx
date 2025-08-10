import { useGetRoomQuestions } from "@/modules/room/hooks/queries";
import type { Room } from "@/modules/room/schemas";
import type { Question } from "../schemas";
import { QuestionItemContainers } from "./question-item-containers";

interface QuestionListContainersProps {
	roomId: Room["id"];
	optimistic: Question[];
}

export const QuestionListContainers = (props: QuestionListContainersProps) => {
	const { roomId, optimistic } = props;

	const { data } = useGetRoomQuestions({
		roomId,
	});

	const real = data ?? [];

	// combina e remove possíveis duplicatas
	const optimisticIds = new Set(
		optimistic.map((o) => o.id), // quando mescla, vira id real
	);

	// enquanto o otimista existir, esconda o duplicado real
	const realFiltered = real.filter((r) => !optimisticIds.has(r.id));

	const combined = [...optimistic, ...realFiltered];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">
					Perguntas & Respostas
				</h2>
			</div>

			{combined?.map((question) => (
				<QuestionItemContainers key={question.id} question={question} />
			))}
		</div>
	);
};
