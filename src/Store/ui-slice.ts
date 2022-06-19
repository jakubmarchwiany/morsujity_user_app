import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UiState {
    notification: {
        message?: string;
        type?: "success" | "info" | "warning" | "error" | undefined;
        open?: boolean;
    };
}

// Define the initial state using that type
const initialState: UiState = {
    notification: { open: false, message: "" },
};

interface payLoad {
    message?: string;
    type?: "success" | "info" | "warning" | "error" | undefined;
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        showNotification(state, action: PayloadAction<payLoad>) {
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: true,
            };
        },
        hideNotification(state) {
            state.notification = {
                open: false,
            };
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
