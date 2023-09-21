import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Group = {
    _id: string;
    name: string;
};

type UserState = {
    _id: string | undefined;
    pseudonym: string | undefined;
    imageUrl: string | undefined;
    groups: Group[] | undefined;
};

const initialState: UserState = {
    _id: undefined,
    pseudonym: undefined,
    imageUrl: undefined,
    groups: undefined,
};

type UserData = {
    _id: string;
    pseudonym: string;
    imageUrl: string;
    groups: Group[];
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            return { ...action.payload };
        },
        updatePseudonym(state, action: PayloadAction<string>) {
            state.pseudonym = action.payload;
        },
        updateImage(state, action: PayloadAction<string>) {
            state.imageUrl = action.payload;
        },
    },
});
const userActions = userSlice.actions;
const userSliceReducers = userSlice.reducer;

export { userActions, userSliceReducers };
