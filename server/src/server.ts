import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import { createRoomRoute } from "./http/routes/rooms/create-room.ts";
import { getRoomsRoute } from "./http/routes/rooms/get-rooms.ts";
import { getRoomsQuestions } from "./http/routes/rooms/get-rooms-questions.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: "http://localhost:5173",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return "OK";
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);

app.listen({ port: env.PORT });
