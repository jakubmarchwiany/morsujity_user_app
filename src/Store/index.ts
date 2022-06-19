import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        ui: uiSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
