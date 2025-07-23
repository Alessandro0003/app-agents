
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // adicione outras variáveis VITE_* aqui conforme seu projeto
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}