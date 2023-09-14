/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_DOMAIN_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
