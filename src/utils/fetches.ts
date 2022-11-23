import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { authorizationFail } from "./useful";

const { VITE_API_ENDPOINT } = import.meta.env;

export async function getFetch<T>(
    url: string,
    options?: { customError?: boolean },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("authorization")}`,
            },
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) await authorizationFail();

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
    options?: { customError?: boolean },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("authorization")}`,
            },
            body: JSON.stringify(body),
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) await authorizationFail();

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
    options?: { customError?: boolean },
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        const toastId = toast.loading("Ładowanie...");
        fetch(VITE_API_ENDPOINT + url, {
            method: "POST",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${Cookies.get("authorization")}`,
            },
            body: body,
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    toast.success(data.message, { id: toastId });
                    resolve(data);
                } else {
                    toast.error(data.message, { id: toastId });
                    if (response.status === 401) await authorizationFail();

                    if (options?.customError) reject(data);
                }
            })
            .catch((error) => {
                toast.error("Serwer nie odpowiada :(", { id: toastId });
                if (options?.customError) reject(error);
            });
    });
}
