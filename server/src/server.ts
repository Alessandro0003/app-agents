import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "./env.ts";
import { roomsRoute } from "./http/routes/rooms/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: env.ALLOWED_ORIGINS,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler((error, _, reply) => {
	console.error(error);
	reply.status(error.statusCode || 500).send({
		message: error.message || "Internal server error",
	});
});

app.get("/health", () => "OK");

// Rotas agrupadas
app.register(roomsRoute);

app.listen({ port: env.PORT });
