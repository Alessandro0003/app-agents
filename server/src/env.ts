import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string().url().startsWith("postgresql://"),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	ALLOWED_ORIGINS: z.string().url(),
	GEMINI_API_KEY: z.string().min(1, "GENAI_API_KEY is required"),
});

export const env = envSchema.parse(process.env);
