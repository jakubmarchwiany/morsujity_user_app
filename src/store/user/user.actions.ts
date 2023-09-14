import Cookies from "js-cookie";
import { StatisticsState, statisticsActions } from "store/statistics/statistics.slice";
import { dataURLtoFile } from "utils/dataURLToFile";
import { getFetch, imageFetch, postFetch } from "utils/fetches";
import { sleep } from "utils/sleep";
import { authorizationFail } from "utils/useful";
import { AppThunk } from "../index";
import { userActions } from "./user.slice";

type UserData = {
    _id: string;
    pseudonym: string;
    image: string;
    statistics: StatisticsState;
};

export const getUserData =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>("/user/data", {
            customError: true,
        })
            .then(({ data }) => {
                const { _id, image: imageUrl, pseudonym, statistics } = data;

                appDispatch(userActions.setUserData({ _id, imageUrl, pseudonym }));
                appDispatch(statisticsActions.setStatistics(statistics));
                setIsLogged(true);
            })
            .catch((e) => {
                authorizationFail();
            });
    };

export const changePseudonym =
    (pseudonym: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ pseudonym: string }>({ pseudonym }, "/user/settings/change-pseudonym").then(
            () => {
                appDispatch(userActions.changePseudonym(pseudonym));
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

        imageFetch<{ image: string }>(data, "/user/settings/update-image").then(({ image }) => {
            appDispatch(userActions.changeImage(image));
        });
    };

export const setUserImageToDef = (): AppThunk => async (appDispatch) => {
    getFetch<{ image: string }>("/user/settings/set-image-to-def").then(({ image }) => {
        appDispatch(userActions.changeImage(image));
    });
};
