/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEV_API_ENDPOINT: string;
    readonly VITE_PRO_API_ENDPOINT: string;
    readonly VITE_DEF_USER_IMAGE: string;
    readonly VITE_USER_IMAGE_PATH: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
