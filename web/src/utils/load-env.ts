type EnvKey = `$VITE_${string}`

interface LoadEnvOptions {
  required?: boolean
}

/**
 * Loads the value of an environment variable.
 *
 * @template TValue - The type of the environment variable value.
 * @param {EnvKey | TValue} arg - The environment key or value to load.
 * @param {LoadEnvOptions} [options] - Options for loading the environment variable.
 * @returns {TValue} - The value of the environment variable.
 * @throws {Error} - If the environment variable is missing or invalid.
 */
export const loadEnv = <TValue>(
  arg: EnvKey | TValue,
  options?: LoadEnvOptions,
): TValue => {
  const { required = true } = options ?? {}

  const isEnvKey = typeof arg === 'string' && arg.startsWith('$VITE_')

  if (!isEnvKey) {
    // Se for valor direto, retorna sem buscar no import.meta.env
    return arg as TValue
  }

  // Remove o "$" do início e busca no import.meta.env
  const key = arg.slice(1) as keyof ImportMetaEnv
  const value = import.meta.env[key]

  if (value === undefined) {
    if (required) {
      throw new Error(`Missing environment variable: ${arg}`)
    }
    return undefined as unknown as TValue
  }

  return value as TValue
}
