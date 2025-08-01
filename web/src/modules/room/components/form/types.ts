import type { z } from "zod";
import type { Schema } from "./schema";

export type CreateRoomInput = z.infer<typeof Schema>;
export type CreateRoomOutput = z.infer<typeof Schema>;
