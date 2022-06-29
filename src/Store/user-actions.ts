import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

import { AppThunk } from "./index";

const endPoint: string | undefined = process.env.REACT_APP_API_ENDPOINT;

export const registerUserThunk =
    (pseudonym: string, email: string, password: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + "/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pseudonym, email, password }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                        })
                    );
                    navigate("/login", { replace: true });
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "error",
                            message: data.message,
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: error.message,
                    })
                );
            });
    };

export const loginUserThunk =
    (email: string, password: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + "/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                        })
                    );
                    AppDispatch(userActions.login({ token: data.token, account: data.user }));

                    navigate("/user/home", { replace: true });
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "error",
                            message: data.message,
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: error.message,
                    })
                );
            });
    };

export const logoutUserThunk =
    (token: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + "/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(userActions.logout());
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                        })
                    );
                    navigate("/home", { replace: true });
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "error",
                            message: data.message,
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: error.message,
                    })
                );
            });
    };

export const verifyEmailThunk =
    (hash: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + `/auth/verifyEmail/${hash}`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                        })
                    );
                    navigate("/login", { replace: true });
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "error",
                            message: data.message,
                        })
                    );
                    navigate("/home", { replace: true });
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: error.message,
                    })
                );
                navigate("/home", { replace: true });
            });
    };
