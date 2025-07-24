import { z } from 'zod/v4';


export const createRoomSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
  })
})

export type CreateRoomBody = z.infer<typeof createRoomSchema>['body'];