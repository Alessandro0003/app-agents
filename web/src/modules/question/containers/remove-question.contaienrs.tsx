import type { JSX } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBoolean } from "@/hooks/useBoolean";
import { useDeleteQuestion } from "@/modules/room/hooks/mutation";
import type { Question } from "../schemas";

interface DeleteQuestionContainerProps {
	renderTrigger: (onOpen: () => void) => JSX.Element;
	questionId: Question["id"];
}

export const DeleteQuestionContainer = (
	props: DeleteQuestionContainerProps,
) => {
	const { renderTrigger, questionId } = props;
	const { value: isOpen, onTrue: onOpen, onFalse: onClose } = useBoolean();

	const { mutate: remove } = useDeleteQuestion({
		onSuccess: () => {
			onClose();
		},
	});

	const handleDelete = () => {
		remove({
			questionId,
		});
	};

	return (
		<>
			{renderTrigger(onOpen)}
			<AlertDialog open={isOpen} onOpenChange={onClose}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deseja Remover pergunta ?</AlertDialogTitle>
						<AlertDialogDescription>
							Caso queira remover a pergunta, clique em confirmar.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter>
						<Button variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button onClick={handleDelete}>Confirmar</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
