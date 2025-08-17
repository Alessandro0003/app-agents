import { useEffect, useRef, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCreateRoomQuestion } from "@/modules/room/hooks/mutation";
import type { Room } from "@/modules/room/schemas";
import { createRecorder, releaseMic } from "@/utils/audio-record";
import { QuestionForm, useQuestionForm } from "../components/form";
import type { QuestionFormOutput } from "../components/form/types";

type Props = {
	roomId: Room["id"];
	addOptimistic: (text: string) => string;
	mergeOptimistic: (
		tempId: string,
		real: { id: string; answer?: string; createdAt?: string },
	) => void;
};

export const CreateQuestionContainers = ({
	roomId,
	addOptimistic,
	mergeOptimistic,
}: Props) => {
	const form = useQuestionForm({ defaultValues: { question: "" } });
	const { mutate: createQuestion, isPending: isSubmitting } =
		useCreateRoomQuestion({
			onSuccess: () => form.reset(),
		});

	const [isRecording, setIsRecording] = useState(false);

	const recorder = useRef<MediaRecorder | null>(null);
	const recognitionRef = useRef<SpeechRecognition | null>(null);

	// --- helpers ---
	const hasSpeechRecognition = () => {
		const w = window;
		return !!(w.SpeechRecognition || w.webkitSpeechRecognition);
	};

	const initRecognition = () => {
		const w = window;
		const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
		if (!SR) return null;

		const rec: SpeechRecognition = new SR();
		rec.lang = "pt-BR";
		rec.continuous = true;
		rec.interimResults = true;

		let finalText = "";

		rec.onresult = (e: SpeechRecognitionEvent) => {
			let interim = "";
			for (let i = e.resultIndex; i < e.results.length; i++) {
				const res = e.results[i];
				const text = res[0].transcript;
				if (res.isFinal) finalText += text + " ";
				else interim += text;
			}
			const current = (finalText + interim).trim();
			form.setValue("question", current, { shouldDirty: true });
		};

		rec.onend = () => {
			recognitionRef.current = null;
		};

		return rec;
	};

	const stopRecording = () => {
		setIsRecording(false);

		// para reconhecimento (se ativo)
		if (recognitionRef.current) {
			try {
				recognitionRef.current.stop();
			} catch {}
			recognitionRef.current = null;
		}

		// para gravação + desliga o dispositivo
		const rec = recorder.current;
		if (rec) {
			if (rec.state !== "inactive") rec.stop();
			releaseMic(rec); // <- para o mic (some o indicador do navegador)
			recorder.current = null;
		}
	};

	const startRecording = async () => {
		// se já tiver algo ativo, limpa tudo
		stopRecording();

		setIsRecording(true);

		// cria o MediaRecorder: quando chegar o blob final, faz fallback de transcrição no servidor
		recorder.current = await createRecorder(
			() => setIsRecording(false), // onStop
		);
		recorder.current.start();

		// Web Speech (live) se disponível
		if (hasSpeechRecognition()) {
			const rec = initRecognition();
			if (rec) {
				recognitionRef.current = rec;
				try {
					rec.start();
				} catch {}
			}
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// cleanup ao desmontar
		return () => stopRecording();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (data: QuestionFormOutput) => {
		const tempId = addOptimistic(data.question);
		createQuestion(
			{ roomId, question: data.question },
			{
				onSuccess: (api) => {
					mergeOptimistic(tempId, {
						id: api.id,
						answer: api.answer,
						createdAt: api.createdAt,
					});
				},
				onError: () => {
					mergeOptimistic(tempId, { id: `discard-${tempId}` });
				},
			},
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma Pergunta</CardTitle>
				<CardDescription>
					Fale ou digite sua pergunta e eu transcrevo para você.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<QuestionForm
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
					isRecording={isRecording}
					startRecording={startRecording}
					stopRecording={stopRecording}
					{...form}
				/>
			</CardContent>
		</Card>
	);
};
