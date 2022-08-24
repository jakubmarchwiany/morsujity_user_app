import type { NavigateFunction } from "react-router-dom";
import type { AppThunk } from "store";
import { postApi } from "utils/fetches";
import type { UserData } from "./user-slice";
import { userActions } from "./user-slice";

export const registerUser =
    (pseudonym: string, email: string, password: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<{ message: string }>(
            { pseudonym, email, password },
            "/auth/register",
            appDispatch,
            5000,
        ).then(() => {
            navigate("/login", { replace: true });
        });
    };

export const verifyEmail =
    (token: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<never>(
            { token },
            "/auth/verify-user-email",
            appDispatch,
            5000,
            undefined,
            true,
        )
            .then(({ token, user }) => {
                appDispatch(userActions.login({ token, user }));
                navigate("/login", { replace: true });
            })
            .catch(() => {
                navigate("/", { replace: true });
            });
    };

export const loginUser =
    (email: string, password: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<{ token: string; user: UserData }>(
            { email, password },
            "/auth/login",
            appDispatch,
        ).then(({ token, user }) => {
            appDispatch(userActions.login({ token, user }));
            navigate(`/${user.type}/dashboard`, { replace: true });
        });
    };

export const logoutUser =
    (navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<never>({}, "/auth/logout", appDispatch).then(() => {
            appDispatch(userActions.logout());
            navigate("/", { replace: true });
        });
    };

export const requestResetPassword =
    (email: string): AppThunk =>
    async (appDispatch) => {
        await postApi<never>({ email }, "/auth/request-reset-password", appDispatch, 5000);
    };

export const resetPassword =
    (newPassword: string, token: string, navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<never>({ newPassword, token }, "/auth/reset-password", appDispatch, 5000)
            .then(() => {
                navigate("/login", { replace: true });
            })
            .catch(() => {
                navigate("/login", { replace: true });
            });
    };
