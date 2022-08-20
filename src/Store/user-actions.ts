import Cookies from "js-cookie";
import { AppThunk } from "./index";
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";

const {
    REACT_APP_ENV: ENV,
    REACT_APP_DEV_API_ENDPOINT: DEV_API_ENDPOINT,
    REACT_APP_PRO_API_ENDPOINT: PRO_API_ENDPOINT,
} = process.env;

const END_POINT = ENV === "development" ? DEV_API_ENDPOINT : PRO_API_ENDPOINT;

export const getUserData =
    (navigate: any): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/user/get-data`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        userActions.login({
                            token: Cookies.get("Authorization")!,
                            data: data.user,
                        })
                    );
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: "Udało się zalogować",
                        })
                    );

                    navigate(`/${data.user.type}/dashboard`, { replace: true });
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                    navigate("/login", { replace: true });
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
                navigate("/login", { replace: true });
            });
    };

export const changeUserPseudonym =
    (pseudonym: string): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/user/change-pseudonym`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pseudonym }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(userActions.updatePseudonym(pseudonym));
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
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

export const changeUserPassword =
    (oldPassword: string, newPassword: string): AppThunk =>
    async (AppDispatch) => {
        fetch(END_POINT + `/auth/change-password`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldPassword, newPassword }),
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
                } else {
                    AppDispatch(uiActions.showErrorNotification(data.message));
                }
            })
            .catch(() => {
                AppDispatch(uiActions.showErrorDefNotify());
            });
    };

function dataURLtoFile(dataUrl: any, filename: any) {
    var arr = dataUrl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

export const changeUserImage =
    (base64EncodedImage: any): AppThunk =>
    async (AppDispatch) => {
        var data = new FormData();
        data.append("userImage", dataURLtoFile(base64EncodedImage, "userImage.png"));
        AppDispatch(
            uiActions.showNotification({
                type: "success",
                message: "Wysyłam zdjęcie",
            })
        );
        fetch(END_POINT + "/user/change-image", {
            method: "POST",
            body: data,
            credentials: "include",
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(userActions.updateImage(data.image));
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
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

export const changeToDefUserImage = (): AppThunk => async (AppDispatch) => {
    fetch(END_POINT + `/user/change-user-image-to-def`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    })
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                AppDispatch(userActions.updateImage(data.image));
                AppDispatch(
                    uiActions.showNotification({
                        type: "success",
                        message: data.message,
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
