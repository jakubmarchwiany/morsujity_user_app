import Cookies from "js-cookie";
import { getFetch } from "utils/fetches";
import { sleep } from "utils/sleep";
import { ENV } from "utils/validate_env";

const { isProd } = ENV;

export const logout = () => {
    getFetch<never>("/auth/logout").then(async () => {
        await sleep(1000);
        removeCookieAndRedirect();
    });
};

const removeCookieAndRedirect = async () => {
    console.log(isProd);
    if (isProd) {
        Cookies.remove("authorization");
        window.localStorage.setItem("logout", Date.now().toString());
        let newURL = window.location.hostname;
        newURL = newURL.substring(newURL.indexOf(".") + 1);
        window.location.href = newURL;
    }
};
