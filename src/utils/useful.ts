import Cookies from "js-cookie";
import toast from "react-hot-toast";

const { PROD } = import.meta.env;

// Cookies.set(
//     "authorization",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjI0MzEwMTEyNGFkMzQ1YjlmOWQiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE2NjgwODY2NzMsImV4cCI6MTY2ODY5MTQ3M30.KuC79nLQwcCPEy__gIjfpX_0HCK359NKTIZLg2JN7gU",
//     { expires: 60 * 60 * 24 * 1000 },
// );

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const sleeper = async (duration: number) => {
    const timer = toast(`${duration}`);
    for (let i = duration; i >= 0; i--) {
        toast(`${i}`, { id: timer });
        await sleep(1000);
    }
    toast.dismiss(timer);
};

export const authorizationFail = async () => {
    Cookies.remove("authorization");
    toast.error("Zaloguj się ponownie", { duration: 3000 });
    await sleeper(3);
    window.location.reload();
};

export const logout = async () => {
    if (PROD) {
        Cookies.remove("authorization");
        let newURL = window.location.hostname;
        newURL = newURL.substring(newURL.indexOf(".") + 1);
        window.location.href = newURL;
    }
};
