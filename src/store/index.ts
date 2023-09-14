import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { userSliceReducers } from "store/user/user.slice";

const store = configureStore({
    reducer: {
        user: userSliceReducers,
    },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AnyAction>;
export { AppDispatch, AppThunk, RootState, store };
