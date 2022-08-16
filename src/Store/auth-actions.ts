import { AppThunk } from "./index";
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";

const {
    REACT_APP_ENV: ENV,
    REACT_APP_DEV_API_ENDPOINT: DEV_API_ENDPOINT,
    REACT_APP_PRO_API_ENDPOINT: PRO_API_ENDPOINT,
} = process.env;

const END_POINT = ENV === "development" ? DEV_API_ENDPOINT : PRO_API_ENDPOINT;

export const registerUser =
    (pseudonym: string, email: string, password: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + "/auth/register", {
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
                            duration: 5000,
                        })
                    );
                    navigate("/login", { replace: true });
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

export const loginUser =
    (email: string, password: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + "/auth/login", {
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
                    AppDispatch(userActions.login({ token: data.token, data: data.user }));

                    navigate(`/${data.user.type}/dashboard`, { replace: true });
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

export const logoutUser =
    (navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + "/auth/logout", {
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
                    navigate("/", { replace: true });
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

export const verifyEmail =
    (token: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/auth/verify-user-email`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                            duration: 5000,
                        })
                    );
                    navigate("/login", { replace: true });
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                    navigate("/home", { replace: true });
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
                navigate("/home", { replace: true });
            });
    };

export const requestResetPassword =
    (email: string): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/auth/request-reset-password`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                            duration: 5000,
                        })
                    );
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

export const resetPassword =
    (newPassword: string, token: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/auth/reset-password`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword, token }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                            duration: 5000,
                        })
                    );
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
                navigate("/login", { replace: true });
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
                navigate("/login", { replace: true });
            });
    };
