import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AppState {
    mode: PaletteMode;
}

const initialState: AppState = {
    mode: "light",
};

const appSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        switchMode(state) {
            if (state.mode === "light") state.mode = "dark";
            else state.mode = "light";

            Cookies.set("mode", state.mode);
        },
        setMode(state, action: PayloadAction<string>) {
            if (action.payload === "light" || action.payload === "dark")
                state.mode = action.payload;
        },
    },
});

export const appActions = appSlice.actions;

// export const selectToken = (state: RootState) => state.user.token

export default appSlice.reducer;
