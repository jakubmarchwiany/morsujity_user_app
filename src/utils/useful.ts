import dayjs from "dayjs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Cookies.set(
//     "authorization",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZjI0MzEwMTEyNGFkMzQ1YjlmOWQiLCJ1c2VyVHlwZSI6InVzZXIiLCJpYXQiOjE2NjgwODY2NzMsImV4cCI6MTY2ODY5MTQ3M30.KuC79nLQwcCPEy__gIjfpX_0HCK359NKTIZLg2JN7gU",
//     { expires: 7 },
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

export const displayTime = (time: number) => {
    return `${Math.floor(time / 60)} min ${time % 60 !== 0 ? (time % 60) + " sek" : ""}`;
};

export const displayDate = (date: string) => {
    if (dayjs(date).hour() === 0 && dayjs(date).minute() === 0)
        return dayjs(date).format("DD.MM.YYYY");
    else return dayjs(date).format("DD.MM.YYYY HH:mm");
};
