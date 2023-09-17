import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ActivityTypes {
    ColdShower,
    WinterSwiming,
}

console.log(ActivityTypes);

export type Rank = {
    N: number;
    name: string;
    maxValue: number;
};

export type Activity = {
    _id: string;
    type: ActivityTypes;
    date: string;
    duration: number;
};

export type StatisticsState = {
    rank: Rank | undefined;
    subRank: Rank | undefined;
    activities: Activity[] | undefined;
    totalActivitiesTime: number[] | undefined;
};

const initialState: StatisticsState = {
    rank: undefined,
    subRank: undefined,
    activities: undefined,
    totalActivitiesTime: undefined,
};

type CreateActivity = {
    activity: Activity;
    rank: Rank;
    subRank: Rank;
};

const statisticsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setStatistics(state, action: PayloadAction<StatisticsState>) {
            return {
                ...action.payload,
            };
        },
        createActivity(state, action: PayloadAction<CreateActivity>) {
            const { activity, rank, subRank } = action.payload;
            console.log(activity, rank, subRank);

            const totalActivitiesTime = [...state.totalActivitiesTime!];

            totalActivitiesTime[activity.type] += activity.duration;

            return {
                rank,
                subRank,
                activities: [...state.activities!, activity],
                totalActivitiesTime: totalActivitiesTime,
            };
        },
        deleteActivity(state, action: PayloadAction<CreateActivity>) {
            const { activity, rank, subRank } = action.payload;
            console.log(activity, rank, subRank);

            const totalActivitiesTime = [...state.totalActivitiesTime!];

            totalActivitiesTime[activity.type] -= activity.duration;

            return {
                rank,
                subRank,
                activities: state.activities!.filter((a) => a._id !== activity._id),
                totalActivitiesTime: totalActivitiesTime,
            };
        },
        setActivities(state, action: PayloadAction<Activity[]>) {
            state.activities = action.payload;
        },
    },
});
const statisticsActions = statisticsSlice.actions;
const statisticsSliceReducers = statisticsSlice.reducer;

export { statisticsActions, statisticsSliceReducers };
