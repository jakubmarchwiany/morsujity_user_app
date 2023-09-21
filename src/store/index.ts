import { configureStore } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { gropusSliceReducers } from "store/groups/groups.slice";
import { statisticsSliceReducers } from "store/statistics/statistics.slice";
import { userSliceReducers } from "store/user/user.slice";

const store = configureStore({
    reducer: {
        user: userSliceReducers,
        statistics: statisticsSliceReducers,
        groups: gropusSliceReducers,
    },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AnyAction>;
export { AppDispatch, AppThunk, RootState, store };
