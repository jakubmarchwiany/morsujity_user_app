import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const { VITE_DEF_USER_IMAGE_URL, VITE_USERS_IMAGE_URL } = import.meta.env;

interface UserState {
    logIn: boolean;
    _id: string | null;
    type: string | null;
    email: string | null;
    pseudonym: string | null;
    image: string | undefined;
}

const initialState: UserState = {
    logIn: false,
    _id: null,
    type: null,
    email: null,
    pseudonym: null,
    image: undefined,
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
        setUserData(state, action: PayloadAction<LoginPayload>) {
            let image: string;
            if (action.payload.user.image === "def") {
                image = VITE_DEF_USER_IMAGE_URL;
            } else {
                image = VITE_USERS_IMAGE_URL + action.payload.user.image + ".webp";
            }

            return Object.assign(state, {
                logIn: true,
                token: action.payload.token,
                _id: action.payload.user._id,
                type: action.payload.user.type,
                email: action.payload.user.email,
                pseudonym: action.payload.user.pseudonym,
                image: image,
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
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
