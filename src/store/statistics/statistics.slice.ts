import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Rank = {
    N: number;
    name: string;
    maxValue: number;
};

export type Activity = {
    _id: string;
    activityType: boolean;
    date: string;
    duration: number;
};

export type StatisticsState = {
    rank: Rank | undefined;
    subRank: Rank | undefined;
    timeColdShowers: number | undefined;
    timeMorses: number | undefined;
    activities: Activity[] | undefined;
};

const initialState: StatisticsState = {
    rank: undefined,
    subRank: undefined,
    timeColdShowers: undefined,
    timeMorses: undefined,
    activities: undefined,
};

type newActivity = {
    activity: Activity;
    rank: Rank;
    subRank: Rank;
    timeColdShowers: number;
    timeMorses: number;
};
type deleteActivity = {
    activityID: string;
    rank: Rank;
    subRank: Rank;
    timeColdShowers: number;
    timeMorses: number;
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
        newActivity(state, action: PayloadAction<newActivity>) {
            const { activity, rank, subRank, timeColdShowers, timeMorses } = action.payload;
            return {
                activities: [...state.activities!, activity],
                rank: rank,
                subRank: subRank,
                timeColdShowers: timeColdShowers,
                timeMorses: timeMorses,
            };
        },
        deleteActivity(state, action: PayloadAction<deleteActivity>) {
            const { activityID } = action.payload;
            return {
                ...action.payload,
                activities: state.activities!.filter((a) => a._id !== activityID),
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
