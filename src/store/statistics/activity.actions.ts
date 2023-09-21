/* eslint-disable @typescript-eslint/no-floating-promises */
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { Activity } from "store/statistics/activity.type";
import { ActivityType } from "store/statistics/activity_type.type";
import { Rank } from "store/statistics/rank.type";
import { statisticsActions } from "store/statistics/statistics.slice";

import { getFetch, postFetch } from "utils/fetches";

export const createActivity =
    (type: ActivityType, date: string, duration: number, navigate: NavigateFunction): AppThunk =>
    (appDispatch) => {
        postFetch<{
            data: {
                rank: Rank;
                subRank: Rank;
                activityId: string;
            };
        }>({ type, date, duration }, "/user/activity/create").then(({ data }) => {
            const { rank, subRank, activityId } = data;
            const activity: Activity = { _id: activityId, type, date, duration };

            appDispatch(statisticsActions.createActivity({ activity, rank, subRank }));

            navigate("/", { replace: true });
        });
    };

export const deleteActivity =
    (activity: Activity): AppThunk =>
    (appDispatch) => {
        postFetch<{
            data: {
                rank: Rank;
                subRank: Rank;
            };
        }>({ _id: activity._id }, "/user/activity/delete").then(({ data }) => {
            appDispatch(statisticsActions.deleteActivity({ ...data, activity }));
        });
    };

export const getAllActivity = (): AppThunk => (appDispatch) => {
    getFetch<{ data: Activity[] }>("/user/activity/all", {
        customError: true
    }).then(({ data }) => {
        console.log(data);
        appDispatch(statisticsActions.setActivities(data));
        // appDispatch(userActions.setAllActivity(activity));
    });
};
