import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataType {
    type: string;
    email: string;
    pseudonym: string;
    image: string;
}

interface UserState {
    token: null | string;
    data: null | DataType;
}

// Define the initial state using that type
const initialState: UserState = {
    token: null,
    data: null,
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
            state.token = action.payload.token;
            state.data = action.payload.data;
        },
        logout(state) {
            state.token = null;
            state.data = null;
        },
    },
});

export const userActions = userSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default userSlice.reducer;
