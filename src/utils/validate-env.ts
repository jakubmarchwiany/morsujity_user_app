import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(import.meta.env, {
        VITE_API_ENDPOINT: str(),
        VITE_DEF_USER_IMAGE_URL: str(),
        VITE_USERS_IMAGE_URL: str(),
    });
}
export default validateEnv;
