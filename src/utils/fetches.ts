import { AppDispatch } from "store";
import { uiActions } from "store/ui-slice";

const {
    VITE_ENV: ENV,
    VITE_DEV_API_ENDPOINT: DEV_API_ENDPOINT,
    VITE_PRO_API_ENDPOINT: PRO_API_ENDPOINT,
} = import.meta.env;

const END_POINT: string = ENV === "development" ? DEV_API_ENDPOINT : PRO_API_ENDPOINT;

type statusType = "error" | "info" | "success" | "warning";

export async function api<T>(
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    reject(data);
                }
            })
            .catch(() => {
                appDispatch(uiActions.showErrorDefNotify());
                if (customError) {
                    reject(new Error());
                }
            });
    });
}

export async function postApi<T>(
    body: object,
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    reject(data);
                }
            })
            .catch(() => {
                appDispatch(uiActions.showErrorDefNotify());
                if (customError) {
                    reject(new Error());
                }
            });
    });
}

export async function imageApi<T>(
    body: FormData,
    url: string,
    appDispatch: AppDispatch,
    duration = 2500,
    type: statusType = "success",
    customError = false,
): Promise<T & { message: string }> {
    return new Promise((resolve, reject) => {
        fetch(END_POINT + url, {
            method: "POST",
            credentials: "include",
            body: body,
        })
            .then(async (response) => {
                const data = (await response.json()) as T & { message: string };
                if (response.ok) {
                    appDispatch(
                        uiActions.showNotification({ message: data.message, type, duration }),
                    );
                    resolve(data);
                } else {
                    appDispatch(uiActions.showErrorNotification(data.message));
                    reject(data);
                }
            })
            .catch(() => {
                appDispatch(uiActions.showErrorDefNotify());
                if (customError) {
                    reject(new Error());
                }
            });
    });
}
