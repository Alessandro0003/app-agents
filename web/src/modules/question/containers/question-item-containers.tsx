import { QuestionItem } from "../components/item/question-item";
import type { Question } from "../schemas";

interface QuestionItemContainersProps {
	question: Question;
}

export const QuestionItemContainers = (props: QuestionItemContainersProps) => {
	const { question } = props;

	// !TODO - Implement the logic to fetch the question data
	// const { data: question } = useGetQuestion({})

	return (
		<div>
			<QuestionItem question={question} />
		</div>
	);
};
