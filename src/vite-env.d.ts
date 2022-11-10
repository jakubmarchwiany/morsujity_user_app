/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_ENDPOINT: string;
    readonly VITE_DEF_USER_IMAGE_URL: string;
    readonly VITE_USERS_IMAGE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
