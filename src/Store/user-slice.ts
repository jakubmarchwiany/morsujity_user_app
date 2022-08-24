import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    logIn: boolean;
    token: string | null;
    _id: string | null;
    type: string | null;
    email: string | null;
    pseudonym: string | null;
    image: string | null;
}

const initialState: UserState = {
    logIn: false,
    token: null,
    _id: null,
    type: null,
    email: null,
    pseudonym: null,
    image: null,
};
export type UserData = {
    _id: number;
    type: string;
    email: string;
    pseudonym: string;
    image: string;
};

type LoginPayload = {
    token: string;
    user: UserData;
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            return Object.assign(state, {
                logIn: true,
                _id: action.payload.user._id,
                token: action.payload.token,
                type: action.payload.user.type,
                email: action.payload.user.email,
                pseudonym: action.payload.user.pseudonym,
                image: action.payload.user.image,
            });
        },
        updatePseudonym(state, action: PayloadAction<string>) {
            return Object.assign(state, { pseudonym: action.payload });
        },
        updateImage(state, action: PayloadAction<string>) {
            return Object.assign(state, { image: action.payload });
        },
        logout(state) {
            return Object.assign(state, {
                logIn: false,
                _id: null,
                token: null,
                type: null,
                email: null,
                pseudonym: null,
                image: null,
            });
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
