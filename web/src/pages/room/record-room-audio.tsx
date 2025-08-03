import { Navigate, useParams } from "react-router-dom";
import { RecordRoomAudioContainer } from "@/modules/room/containers/record-audio-room-containers";

export const RecordRoomAudio = () => {
	const { roomId } = useParams<{ roomId: string }>();

	if (!roomId) {
		return <Navigate replace to="/" />;
	}

	return (
		<div className="h-screen flex items-center justify-center gap-3 flex-col">
			<RecordRoomAudioContainer roomId={roomId} />
		</div>
	);
};
