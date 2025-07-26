import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { createRoomSchema, type CreateRoomBody } from '../schemas/rooms/index.ts';
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schemas/index.ts";

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/rooms', { schema: createRoomSchema }, async (request, reply) => {

    const { name, description } = request.body as CreateRoomBody;

    if (!name || !description) {
      return reply.status(400).send({ error: 'Name and description are required.' });
    }

    const result = await db.insert(schema.rooms).values({
      name,
      description,
    }).returning()

    const insertedRoom = result[0];

    if (!insertedRoom) {
      throw new Error('Failed to create room');
    }

    return reply.status(201).send({
      roomId: insertedRoom.id
    })
  })
}