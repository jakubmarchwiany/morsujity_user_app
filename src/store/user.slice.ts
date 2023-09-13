import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { VITE_DEF_USER_IMAGE_URL, VITE_USERS_IMAGE_URL } = import.meta.env;

export type Rank = {
    N: number;
    name: string;
    maxValue: number;
};

export type Activity = {
    _id: string;
    isMors: boolean;
    date: string;
    duration: number;
};

export type Statistics = {
    rank: Rank;
    subRank: Rank;
    timeColdShowers: number;
    timeMorses: number;
    activity: Activity[];
};

type UserState = {
    _id: string | null;
    type: string | null;
    pseudonym: string | null;
    image: string | undefined;
    statistics: Statistics | null;
};

const initialState: UserState = {
    _id: null,
    type: null,
    pseudonym: null,
    image: undefined,
    statistics: null,
};
export type UserData = {
    _id: number;
    pseudonym: string;
    image: string;
    statistics: Statistics;
};

type newActivityP = {
    activity: Activity;
    rank: Rank;
    subRank: Rank;
    timeColdShowers: number;
    timeMorses: number;
};
type deleteActivityP = {
    activityID: string;
    rank: Rank;
    subRank: Rank;
    timeColdShowers: number;
    timeMorses: number;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            let image: string;
            if (action.payload.image === "def") {
                image = VITE_DEF_USER_IMAGE_URL;
            } else {
                image = VITE_USERS_IMAGE_URL + action.payload.image + ".webp";
            }

            return Object.assign(state, {
                _id: action.payload._id,
                pseudonym: action.payload.pseudonym,
                image: image,
                statistics: action.payload.statistics,
            });
        },
        setAllActivity(state, action: PayloadAction<Activity[]>) {
            return Object.assign(state, {
                statistics: { ...state.statistics, activity: action.payload },
            });
        },
        updatePseudonym(state, action: PayloadAction<string>) {
            return Object.assign(state, { pseudonym: action.payload });
        },
        updateImage(state, action: PayloadAction<string>) {
            let image: string;
            if (action.payload === "def") {
                image = VITE_DEF_USER_IMAGE_URL;
            } else {
                image = VITE_USERS_IMAGE_URL + action.payload + ".webp";
            }

            return Object.assign(state, { image: image });
        },
        newActivity(state, action: PayloadAction<newActivityP>) {
            const { activity, rank, subRank, timeColdShowers, timeMorses } = action.payload;
            return Object.assign(state, {
                statistics: {
                    activity: [...state.statistics!.activity, activity],
                    rank: rank,
                    subRank: subRank,
                    timeColdShowers: timeColdShowers,
                    timeMorses: timeMorses,
                },
            });
        },
        deleteActivity(state, action: PayloadAction<deleteActivityP>) {
            const { activityID, rank, subRank, timeColdShowers, timeMorses } = action.payload;
            return Object.assign(state, {
                statistics: {
                    activity: state.statistics!.activity.filter((a) => a._id !== activityID),
                    rank: rank,
                    subRank: subRank,
                    timeColdShowers: timeColdShowers,
                    timeMorses: timeMorses,
                },
            });
        },
    },
});
const userActions = userSlice.actions;
const userSliceReducers = userSlice.reducer;

export { userActions, userSliceReducers };
