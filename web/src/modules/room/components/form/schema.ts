import { schemaRoom } from "../../schemas";

export const Schema = schemaRoom.pick({
	name: true,
	description: true,
});
