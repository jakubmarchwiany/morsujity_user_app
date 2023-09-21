import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { sleep } from "./sleep";

export const sleeper = async (duration: number): Promise<void> => {
    const timer = toast(`${duration}`);
    for (let i = duration; i >= 0; i--) {
        toast(`${i}`, { id: timer });
        await sleep(1000);
    }
    toast.dismiss(timer);
};

export const authorizationFail = async (): Promise<void> => {
    Cookies.remove("authorization");
    toast.error("Zaloguj się ponownie", { duration: 3000 });
    await sleeper(3);
    window.location.reload();
};
