import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(import.meta.env, {
    VITE_API_ENDPOINT: str(),
    VITE_DOMAIN_URL: str(),
    VITE_DEF_USER_IMAGE_URL: str(),
    VITE_USERS_IMAGE_URL: str(),
});
