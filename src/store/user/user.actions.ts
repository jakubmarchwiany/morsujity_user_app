import { ActivityTypes } from "components/user/new-activity/ActivityPicker";
import { NavigateFunction } from "react-router-dom";
import { getFetch, postFetch } from "utils/fetches";
import { authorizationFail } from "utils/useful";
import { AppThunk } from "../index";
import { Activity, Rank, UserData, userActions } from "./user.slice";

export const getUserData =
    (setIsLogged: Function): AppThunk =>
    (appDispatch) => {
        getFetch<{ user: UserData }>("/user/data", {
            customError: true,
        })
            .then(({ user }) => {
                appDispatch(userActions.setUserData(user));
                setIsLogged(true);
            })
            .catch((e) => {
                authorizationFail();
            });
    };

export const getAllActivity = (): AppThunk => (appDispatch) => {
    getFetch<{ activity: Activity[] }>("/user/allActivity", {
        customError: true,
    }).then(({ activity }) => {
        console.log(activity);
        appDispatch(userActions.setAllActivity(activity));
    });
};

export const newActivity =
    (
        activityType: ActivityTypes,
        date: string,
        duration: number,
        navigate: NavigateFunction,
    ): AppThunk =>
    (appDispatch) => {
        postFetch<{
            data: {
                rank: Rank;
                subRank: Rank;
                timeColdShowers: number;
                timeMorses: number;
                activity: Activity;
            };
        }>({ activityType, date, duration }, "/user/new-activity").then(({ data }) => {
            appDispatch(userActions.newActivity(data));
            navigate(`/`, { replace: true });
        });
    };

export const deleteActivity =
    (activityID: string): AppThunk =>
    (appDispatch) => {
        postFetch<{
            data: { rank: Rank; subRank: Rank; timeColdShowers: number; timeMorses: number };
        }>({ activityID }, "/user/delete-activity").then(({ data }) => {
            appDispatch(userActions.deleteActivity({ ...data, activityID }));
        });
    };
