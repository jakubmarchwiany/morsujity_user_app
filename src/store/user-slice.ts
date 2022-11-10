import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import imgUrl from "assets/def/user.webp";

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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserData>) {
            let image: string;
            if (action.payload.image === "def") {
                image = imgUrl;
            } else {
                image = VITE_USERS_IMAGE_URL + action.payload.image + ".webp";
            }

            return Object.assign(state, {
                logIn: true,
                _id: action.payload._id,
                type: action.payload.type,
                email: action.payload.email,
                pseudonym: action.payload.pseudonym,
                image: image,
            });
        },
        updatePseudonym(state, action: PayloadAction<string>) {
            return Object.assign(state, { pseudonym: action.payload });
        },
        updateImage(state, action: PayloadAction<string>) {
            let image: string;
            if (action.payload === "def") {
                image = imgUrl;
            } else {
                image = VITE_USERS_IMAGE_URL + action.payload + ".webp";
            }

            return Object.assign(state, { image: image });
        },
    },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
