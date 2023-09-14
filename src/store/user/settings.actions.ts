import Cookies from "js-cookie";
import { AppThunk } from "store";
import { userActions } from "store/user/user.slice";
import { dataURLtoFile } from "utils/dataURLToFile";
import { getFetch, imageFetch, postFetch } from "utils/fetches";
import { sleep } from "utils/sleep";

export const changePseudonym =
    (pseudonym: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ pseudonym: string }>({ pseudonym }, "/user/settings/change-pseudonym").then(
            () => {
                appDispatch(userActions.updatePseudonym(pseudonym));
            },
        );
    };

export const changePassword =
    (oldPassword: string, newPassword: string): AppThunk =>
    () => {
        postFetch<never>({ oldPassword, newPassword }, "/auth/password/change").then(async () => {
            await sleep(1000);
            Cookies.remove("authorization");
            location.reload();
        });
    };

export const changeUserImage =
    (base64EncodedImage: string): AppThunk =>
    (appDispatch) => {
        const data = new FormData();
        data.append("userImage", dataURLtoFile(base64EncodedImage, "userImage.png"));

        imageFetch<{ image: string }>(data, "/user/settings/change-image").then(({ image }) => {
            appDispatch(userActions.updateImage(image));
        });
    };

export const setUserImageToDef = (): AppThunk => async (appDispatch) => {
    getFetch<{ image: string }>("/user/settings/set-image-to-def").then(({ image }) => {
        appDispatch(userActions.updateImage(image));
    });
};
