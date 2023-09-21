/* eslint-disable @typescript-eslint/no-floating-promises */
import Cookies from "js-cookie";
import { StatisticsState, statisticsActions } from "store/statistics/statistics.slice";
import { getFetch, imageFetch, postFetch } from "utils/fetches";
import { sleep } from "utils/sleep";
import { AppThunk } from "../index";
import { Group, userActions } from "./user.slice";

type UserData = {
    _id: string;
    pseudonym: string;
    image: string;
    statistics: StatisticsState;
    groups: Group[];
};

export const getUserData =
    (setIsLogged: (arg0: boolean) => void): AppThunk =>
    (appDispatch) => {
        getFetch<{ data: UserData }>("/user/data", {
            customError: true
        }).then(({ data }) => {
            const { _id, image: imageUrl, pseudonym, statistics, groups } = data;

            appDispatch(userActions.setUserData({ _id, imageUrl, pseudonym, groups }));
            appDispatch(statisticsActions.setStatistics(statistics));
            setIsLogged(true);
        });
    };

export const updatePseudonym =
    (pseudonym: string): AppThunk =>
    (appDispatch) => {
        postFetch<{ pseudonym: string }>({ pseudonym }, "/user/settings/update-pseudonym").then(
            () => {
                appDispatch(userActions.updatePseudonym(pseudonym));
            }
        );
    };

export const updatePassword =
    (oldPassword: string, newPassword: string): AppThunk =>
    () => {
        postFetch<never>({ oldPassword, newPassword }, "/auth/password/update").then(async () => {
            await sleep(1000);
            Cookies.remove("authorization");
            location.reload();
        });
    };

export const updateUserImage =
    (formData: FormData): AppThunk =>
    (appDispatch) => {
        imageFetch<{ image: string }>(formData, "/user/settings/update-image").then(({ image }) => {
            appDispatch(userActions.updateImage(image));
        });
    };

export const setUserImageToDef = (): AppThunk => async (appDispatch) => {
    getFetch<{ image: string }>("/user/settings/set-image-to-def").then(({ image }) => {
        appDispatch(userActions.updateImage(image));
    });
};
