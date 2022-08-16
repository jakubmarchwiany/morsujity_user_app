import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    logIn: boolean;
    token: null | string;
    _id: null | string;
    type: null | string;
    email: null | string;
    pseudonym: null | string;
    image: null | string;
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
interface DataType {
    _id: number;
    type: string;
    email: string;
    pseudonym: string;
    image: string;
}

interface LoginPayload {
    token: string;
    data: DataType;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            return Object.assign(state, {
                logIn: true,
                _id: action.payload.data._id,
                token: action.payload.token,
                type: action.payload.data.type,
                email: action.payload.data.email,
                pseudonym: action.payload.data.pseudonym,
                image: action.payload.data.image,
            });
        },
        updatePseudonym(state, action: PayloadAction<string>) {
            return Object.assign(state, { pseudonym: action.payload });
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
