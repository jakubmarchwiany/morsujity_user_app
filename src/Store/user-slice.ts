import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountType {
    userType: String;
    email: String;
    pseudonym: String;
}

interface UserState {
    token: null | string;
    account: null | AccountType;
}

// Define the initial state using that type
const initialState: UserState = {
    token: null,
    account: null,
};

interface LoginPayload {
    token: string;
    account: AccountType;
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.token = action.payload.token;
            state.account = action.payload.account;
        },
        logout(state) {
            state.token = null;
            state.account = null;
        },
    },
});

export const userActions = userSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer;
