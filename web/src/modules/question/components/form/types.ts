import type { z } from "zod";
import type { Schema } from "./schema";

export type QuestionFormInput = z.input<typeof Schema>;
export type QuestionFormOutput = z.output<typeof Schema>;
