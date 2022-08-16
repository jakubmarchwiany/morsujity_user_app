import { PaletteMode } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
    mode: PaletteMode | null;
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

            localStorage.setItem("mode", JSON.stringify(state.mode));
        },
        setMode(state, action: PayloadAction<string>) {
            if (action.payload === "light" || action.payload === "dark")
                state.mode = action.payload;

            localStorage.setItem("mode", JSON.stringify(state.mode));
        },
    },
});
export const appActions = appSlice.actions;
export default appSlice.reducer;
