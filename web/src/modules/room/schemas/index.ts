import { z } from 'zod'

export const schemaRoom = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

export type Room = z.infer<typeof schemaRoom>