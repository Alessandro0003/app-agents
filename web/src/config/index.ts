import { loadEnv } from "@/utils/load-env"

export const config = {
  API_URL: loadEnv<string>('$VITE_API_URL'),
}