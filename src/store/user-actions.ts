import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { dataURLtoFile } from "utils/dataURLToFile";
import {
    authorizationFail,
    getFetch,
    imageFetch,
    postFetch,
    removeUserCookieAndRedirect,
} from "utils/fetches";
import { AppThunk } from "./index";
import { userActions, UserData } from "./user-slice";

export const logoutUser = () => {
    getFetch<never>("/auth/logout", {
        token: Cookies.get("Authorization")!,
    }).then(() => {
        removeUserCookieAndRedirect();
    });
};

export const getUserData =
    (setLoading: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ user: UserData }>("/user/data", {
            customError: true,
            token: Cookies.get("Authorization")!,
        })
            .then(({ user }) => {
                appDispatch(
                    userActions.setUserData({
                        token: Cookies.get("Authorization")!,
                        user: user,
                    }),
                );
                setLoading(false);
            })
            .catch(() => {
                authorizationFail();
            });
    };

export const changeUserPseudonym =
    (pseudonym: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ pseudonym: string }>({ pseudonym }, "/user/change-pseudonym", {
            token: Cookies.get("Authorization")!,
        }).then(() => {
            appDispatch(userActions.updatePseudonym(pseudonym));
        });
    };

export const changeUserPassword =
    (oldPassword: string, newPassword: string): AppThunk =>
    () => {
        postFetch<never>({ oldPassword, newPassword }, "/auth/change-password", {
            token: Cookies.get("Authorization")!,
        });
    };

export const changeUserImage =
    (base64EncodedImage: string): AppThunk =>
    (appDispatch) => {
        const data = new FormData();
        data.append("userImage", dataURLtoFile(base64EncodedImage, "userImage.png"));

        imageFetch<{ image: string }>(data, "/user/change-image", {
            token: Cookies.get("Authorization")!,
        }).then(({ image }) => {
            appDispatch(userActions.updateImage(image));
        });
    };

export const changeToDefUserImage = (): AppThunk => async (appDispatch) => {
    getFetch<{ image: string }>("/user/change-user-image-to-def", {
        token: Cookies.get("Authorization")!,
    }).then(({ image }) => {
        appDispatch(userActions.updateImage(image));
    });
};

export const newActivity =
    (isMors: boolean, data: string, duration: number, navigate: NavigateFunction): AppThunk =>
    (appDispatch) => {
        postFetch<never>({ isMors, data, duration }, "/user/new-activity", {
            token: Cookies.get("Authorization")!,
        }).then(() => {
            navigate(`/dashboard`, { replace: true });
        });
    };
