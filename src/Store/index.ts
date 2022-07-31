import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice,
        user: userSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
