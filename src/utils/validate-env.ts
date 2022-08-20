import { cleanEnv, str } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        REACT_APP_ENV: str({ choices: ["development", "production"] }),
        REACT_APP_DEV_API_ENDPOINT: str(),
        REACT_APP_PRO_API_ENDPOINT: str(),
        REACT_APP_DEF_USER_IMAGE: str(),
    });
}
export default validateEnv;
