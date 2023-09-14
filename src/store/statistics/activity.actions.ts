
import { ActivityTypes } from "components/user/create-activity/ActivityPicker";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { Activity, Rank } from "store/statistics/statistics.slice";
import { userActions } from "store/user/user.slice";
import { getFetch, postFetch } from "utils/fetches";

export const createActivity =
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
        }>({ activityType, date, duration }, "/user/activity/create").then(({ data }) => {
            // appDispatch(userActions.newActivity(data));
            // navigate(`/`, { replace: true });
        });
    };

export const deleteActivity =
    (activityID: string): AppThunk =>
    (appDispatch) => {
        postFetch<{
            data: { rank: Rank; subRank: Rank; timeColdShowers: number; timeMorses: number };
        }>({ activityID }, "/user/delete-activity").then(({ data }) => {
            // appDispatch(userActions.deleteActivity({ ...data, activityID }));
        });
    };

export const getAllActivity = (): AppThunk => (appDispatch) => {
    getFetch<{ activity: Activity[] }>("/user/allActivity", {
        customError: true,
    }).then(({ activity }) => {
        console.log(activity);
        // appDispatch(userActions.setAllActivity(activity));
    });
};
