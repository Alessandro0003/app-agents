import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAlert } from "@/hooks/useAlerts";
import { createRecorder, isRecordingSupported } from "@/utils/audio-record";
import { useAudioUpload } from "../hooks/mutation";
import type { Room } from "../schemas";

interface RecordRoomAudioContainerProps {
	roomId: Room["id"];
}

export const RecordRoomAudioContainer = (
	props: RecordRoomAudioContainerProps,
) => {
	const { roomId } = props;
	const { Alert } = useAlert();
	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);

	const stopRecording = () => {
		setIsRecording(false);
		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}
	};

	const { mutate: uploadAudio } = useAudioUpload({
		onSuccess: () => {
			Alert({
				message: "Áudio enviado com sucesso",
				variant: "success",
			});
		},
	});

	const startRecording = async () => {
		if (!roomId) return;

		if (!isRecordingSupported) {
			Alert({
				message: "A gravação de áudio não é suportada neste navegador.",
				variant: "warning",
			});
			return;
		}

		setIsRecording(true);

		recorder.current = await createRecorder(
			async (audio) => {
				uploadAudio({ audio, roomId });
			},
			() => setIsRecording(false),
		);

		recorder.current.start();
	};

	return (
		<>
			{isRecording ? (
				<Button onClick={stopRecording}>Parar Gravação</Button>
			) : (
				<Button onClick={startRecording}>Gravar Audio</Button>
			)}
			{isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
		</>
	);
};
