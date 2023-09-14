import Cookies from "js-cookie";
import { getFetch, postFetch } from "utils/fetches";
import { sleep } from "utils/sleep";
import { ENV } from "utils/validate_env";

const { isProd } = ENV;

export const loginIn = (
    setIsLoading: Function,
    email: string,
    password: string,
    rememberMe: boolean,
) => {
    postFetch<{
        message: string;
        data: { expires: number; domain: string; token: string };
    }>({ email, password }, "/auth/login", {
        customError: true,
    })
        .then(async ({ data }) => {
            const { domain, expires, token } = data;

            console.log(data);
            Cookies.set("authorization", token, {
                expires: rememberMe ? expires / 24 / 60 / 60 : undefined,
                path: "/",
                domain: domain,
            });
            await sleep(1000);
            window.location.reload();
        })
        .catch(() => {
            setIsLoading(false);
        });
};

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
