import Cookies from "js-cookie";
import toast from "react-hot-toast";

const { VITE_API_ENDPOINT, PROD } = import.meta.env;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const removeUserCookieAndRedirect = () => {
    if (PROD) {
        Cookies.remove("Authorization");
        window.location.href = "/login";
    }
};

export const authorizationFail = async () => {
    toast.error("Przekierowywanie do strony logowania", { duration: 5000 });
    await sleep(1000);
    const timer = toast.error("5");
    await sleep(1000);
    toast.error("4", { id: timer });
    await sleep(1000);
    toast.error("3", { id: timer });
    await sleep(1000);
    toast.error("2", { id: timer });
    await sleep(1000);
    toast.error("1", { id: timer, duration: 1000 });
    await sleep(1000);

    removeUserCookieAndRedirect();
};

type statusType = "error" | "info" | "success" | "warning";

export async function getFetch<T>(
    url: string,
    options?: { customError?: boolean; token?: string },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (options?.token) myHeaders.append("Authorization", `Bearer ${options.token}`);
        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "GET",
            credentials: "include",
            headers: myHeaders,
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) authorizationFail();

                    if (options?.customError) reject(data);
                }
            })
            .catch((error) => {
                toast.error("Serwer nie odpowiada :(", { id: toastId });
                if (options?.customError) reject(error);
            });
    });
}

export async function postFetch<T>(
    body: object,
    url: string,
    options?: { customError?: boolean; token?: string },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        if (options?.token) myHeaders.append("Authorization", `Bearer ${options.token}`);
        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "POST",
            credentials: "include",
            headers: myHeaders,
            body: JSON.stringify(body),
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) authorizationFail();

                    if (options?.customError) reject(data);
                }
            })
            .catch((error) => {
                toast.error("Serwer nie odpowiada :(", { id: toastId });

                if (options?.customError) reject(error);
            });
    });
}

export async function imageFetch<T>(
    body: FormData,
    url: string,
    options?: { customError?: boolean; token?: string },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const myHeaders = new Headers();
        if (options?.token) myHeaders.append("Authorization", `Bearer ${options.token}`);

        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "POST",
            credentials: "include",
            headers: myHeaders,
            body: body,
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) authorizationFail();

                    if (options?.customError) reject(data);
                }
            })
            .catch((error) => {
                toast.error("Serwer nie odpowiada :(", { id: toastId });
                if (options?.customError) reject(error);
            });
    });
}
