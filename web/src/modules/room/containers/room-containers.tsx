import { ArrowLeft, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreateQuestionContainers } from "@/modules/question/containers/create-question-containers";
import { QuestionItemContainers } from "@/modules/question/containers/question-item-containers";
import type { Room } from "../schemas";

interface RoomContainersProps {
	roomId: Room["id"];
}

export const RoomContainers = (props: RoomContainersProps) => {
	const { roomId } = props;

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
				<CreateQuestionContainers roomId={roomId} />
			</div>

			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-2xl text-foreground">
						Perguntas & Respostas
					</h2>
				</div>

				<QuestionItemContainers
					question={{
						id: "1",
						question: "Pergunta 1",
						createdAt: new Date().toISOString(),
					}}
				/>
				<QuestionItemContainers
					question={{
						id: "2",
						question: "Pergunta 2",
						answer: "Resposta 2",
						createdAt: new Date().toISOString(),
					}}
				/>
			</div>
		</>
	);
};
