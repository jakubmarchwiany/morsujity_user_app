import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";
import { AppThunk } from "./index";

let endPoint: string | undefined;
if (process.env.REACT_APP_ENV == "development")
    endPoint = process.env.REACT_APP_DEV_SERVER_ENDPOINT;
if (process.env.REACT_APP_ENV == "production") endPoint = process.env.REACT_APP_PRO_SERVER_ENDPOINT;

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
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
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
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

export const verifyEmailThunk =
    (token: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + `/auth/verifyUserEmail/${token}`, {
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

export const reqResetPasswordThunk =
    (email: string): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + `/auth/reqResetPassword`, {
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

export const resetPasswordThunk =
    (newPassword: string, token: string, navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + `/auth/resetPassword`, {
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
