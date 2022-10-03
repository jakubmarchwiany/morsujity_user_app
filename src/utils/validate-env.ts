import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(import.meta.env, {
        VITE_DEV_API_ENDPOINT: str(),
        VITE_PRO_API_ENDPOINT: str(),
        VITE_DEF_USER_IMAGE: str(),
        VITE_USER_IMAGE_PATH: str(),
    });
}
export default validateEnv;
