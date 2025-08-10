import { ArrowLeft, Radio } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreateQuestionContainers } from "@/modules/question/containers/create-question-containers";
import { QuestionListContainers } from "@/modules/question/containers/question-list";
import type { Question } from "@/modules/question/schemas";
import type { Room } from "../schemas";

interface RoomContainersProps {
	roomId: Room["id"];
}

export const RoomContainers = (props: RoomContainersProps) => {
	const { roomId } = props;

	type OptimisticQ = Question & {
		tempId: string; // sempre fica
		isGeneratingAnswer: boolean;
		__phase: "optimistic" | "merged";
	};

	const [optimistic, setOptimistic] = useState<OptimisticQ[]>([]);

	const addOptimistic = (text: string) => {
		const tempId = crypto.randomUUID();
		const item: OptimisticQ = {
			tempId,
			id: `temp-${tempId}`, // começa com id temporário
			question: text,
			answer: undefined,
			createdAt: new Date().toISOString(),
			isGeneratingAnswer: true,
			__phase: "optimistic",
		};
		setOptimistic((prev) => [item, ...prev]);
		return tempId;
	};

	// chamado no sucesso da mutação
	const mergeOptimistic = (
		tempId: string,
		real: { id: string; answer?: string; createdAt?: string },
	) => {
		setOptimistic((prev) =>
			prev.map((q) =>
				q.tempId === tempId
					? {
							...q,
							id: real.id, // troca pelo id real
							answer: real.answer ?? q.answer,
							createdAt: real.createdAt ?? q.createdAt,
							isGeneratingAnswer: false, // tira loader
							__phase: "merged",
						}
					: q,
			),
		);

		// remove suavemente após um curto delay (ex.: 300ms)
		setTimeout(() => {
			setOptimistic((prev) => prev.filter((q) => q.tempId !== tempId));
		}, 300);
	};

	return (
		<>
			<div className="mb-8">
				<div className="mb-4 flex items-center justify-between">
					<Link to="/">
						<Button variant="outline">
							<ArrowLeft className="mr-2 size-4" />
							Voltar ao Início
						</Button>
					</Link>
					<Link to={`/room/${roomId}/audio`}>
						<Button className="flex items-center gap-2" variant="secondary">
							<Radio className="size-4" />
							Gravar Áudio
						</Button>
					</Link>
				</div>
				<h1 className="mb-2 font-bold text-3xl text-foreground">
					Sala de Perguntas
				</h1>
				<p className="text-muted-foreground">
					Faça perguntas e receba respostas com IA
				</p>
			</div>

			<div className="mb-8">
				<CreateQuestionContainers
					roomId={roomId}
					addOptimistic={addOptimistic}
					mergeOptimistic={mergeOptimistic}
				/>
			</div>

			<QuestionListContainers roomId={roomId} optimistic={optimistic} />
		</>
	);
};
