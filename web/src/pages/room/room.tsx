import { useParams } from "react-router-dom";
import { RoomContainers } from "@/modules/room/containers/room-containers";

export const Room = () => {
	const { roomId } = useParams<{ roomId: string }>();

	console.log({ roomId });

	return (
		<div className="min-h-screen bg-zinc-950">
			<div className="container mx-auto max-w-4xl px-4 py-8">
				<RoomContainers roomId={roomId!} />
			</div>
		</div>
	);
};
