import dayjs from "dayjs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { sleep } from "./sleep";

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
