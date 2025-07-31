import { CreateRoomContainers } from "@/modules/room/containers/create-room-containers";
import { ListRoomContaiers } from "@/modules/room/containers/list-room-containers";

export const CreateRoom = () => {
	return (
		<div className="min-h-screen px-4 py-8">
			<div className="mx-auto max-w-4xl">
				<div className="grid gap-8 grid-cols-2 items-start">
					<div>
						<CreateRoomContainers />
					</div>

					<ListRoomContaiers />
				</div>
			</div>
		</div>
	);
};
