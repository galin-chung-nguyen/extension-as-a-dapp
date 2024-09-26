/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string;
  readonly VITE_TEST_ENV: string;
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string;
  readonly VITE_INFURA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
