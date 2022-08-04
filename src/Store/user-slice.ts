import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataType {
    type: string;
    email: string;
    pseudonym: string;
    image: string;
}

interface UserState {
    logIn: boolean;
    token: null | string;
    type: null | string;
    email: null | string;
    pseudonym: null | string;
    image: null | string;
}

// Define the initial state using that type
const initialState: UserState = {
    logIn: false,
    token: null,
    type: null,
    email: null,
    pseudonym: null,
    image: null,
};

interface LoginPayload {
    token: string;
    data: DataType;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logIn = true;
            state.token = action.payload.token;
            state.type = action.payload.data.type;
            state.email = action.payload.data.email;
            state.pseudonym = action.payload.data.pseudonym;
            state.image = action.payload.data.image;
        },
        logout(state) {
            state.logIn = false;
            state.token = null;
            state.type = null;
            state.email = null;
            state.pseudonym = null;
            state.image = null;
        },
    },
});

export const userActions = userSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer;
