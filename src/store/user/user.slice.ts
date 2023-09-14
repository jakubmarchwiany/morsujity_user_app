import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { VITE_DEF_USER_IMAGE_URL, VITE_USERS_IMAGE_URL } = import.meta.env;

type UserState = {
    _id: string | undefined;
    pseudonym: string | undefined;
    imageUrl: string | undefined;
};

const initialState: UserState = {
    _id: undefined,
    pseudonym: undefined,
    imageUrl: undefined,
};

type UserData = {
    _id: string;
    pseudonym: string;
    imageUrl: string;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            return { ...action.payload };
        },
        changePseudonym(state, action: PayloadAction<string>) {
            state.pseudonym = action.payload;
        },
        changeImage(state, action: PayloadAction<string>) {
            state.imageUrl = action.payload;
        },
    },
});
const userActions = userSlice.actions;
const userSliceReducers = userSlice.reducer;

export { userActions, userSliceReducers };
