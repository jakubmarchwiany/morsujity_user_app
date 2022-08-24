import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { dataURLtoFile } from "utils/dataURLToFile";
import { api, imageApi, postApi } from "utils/fetches";
import { AppThunk } from "./index";
import { uiActions } from "./ui-slice";
import { userActions, UserData } from "./user-slice";

export const getUserData =
    (navigate: NavigateFunction): AppThunk =>
    async (appDispatch) => {
        await postApi<{ user: UserData }>({}, "/user/get-data", appDispatch, 5000, undefined, true)
            .then(({ user }) => {
                appDispatch(
                    userActions.login({
                        token: Cookies.get("Authorization")!,
                        user: user,
                    }),
                );
                navigate(`/${user.type}/dashboard`, { replace: true });
            })
            .catch(() => {
                navigate("/login", { replace: true });
            });
    };

export const changeUserPseudonym =
    (pseudonym: string): AppThunk =>
    async (appDispatch) => {
        await postApi<{ pseudonym: string }>(
            { pseudonym },
            "/user/change-pseudonym",
            appDispatch,
            undefined,
            undefined,
        ).then(() => {
            appDispatch(userActions.updatePseudonym(pseudonym));
        });
    };

export const changeUserPassword =
    (oldPassword: string, newPassword: string): AppThunk =>
    async (appDispatch) => {
        await postApi<never>(
            { oldPassword, newPassword },
            "/auth/change-password",
            appDispatch,
            5000,
            undefined,
        );
    };

export const changeUserImage =
    (base64EncodedImage: string): AppThunk =>
    async (appDispatch) => {
        const data = new FormData();
        data.append("userImage", dataURLtoFile(base64EncodedImage, "userImage.png"));
        appDispatch(
            uiActions.showNotification({
                type: "success",
                message: "Wysyłam zdjęcie...",
            }),
        );
        await imageApi<{ image: string }>(
            data,
            "/user/change-image",
            appDispatch,
            undefined,
            undefined,
        ).then(({ image }) => {
            appDispatch(userActions.updateImage(image));
        });
    };

export const changeToDefUserImage = (): AppThunk => async (appDispatch) => {
    await api<{ image: string }>("/user/change-user-image-to-def", appDispatch).then(
        ({ image }) => {
            appDispatch(userActions.updateImage(image));
        },
    );
};
