import { Trash } from "lucide-react";
import { QuestionItem } from "../components/item/question-item";
import type { Question } from "../schemas";
import { DeleteQuestionContainer } from "./remove-question.contaienrs";

interface QuestionItemContainersProps {
	question: Question;
}

export const QuestionItemContainers = (props: QuestionItemContainersProps) => {
	const { question } = props;

	return (
		<div>
			<QuestionItem
				question={question}
				renderTrigger={() => {
					return (
						<DeleteQuestionContainer
							questionId={question.id}
							renderTrigger={(onOpen) => (
								<Trash
									className="size-4 text-destructive-foreground cursor-pointer hover:text-destructive transition-colors"
									onClick={onOpen}
								/>
							)}
						/>
					);
				}}
			/>
		</div>
	);
};
