import { createSlice } from "@reduxjs/toolkit";

export type GroupsState = {
    groups: string | undefined;
};

const initialState: GroupsState = {
    groups: undefined,
};

const statisticsSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});
const groupsActions = statisticsSlice.actions;
const gropusSliceReducers = statisticsSlice.reducer;

export { gropusSliceReducers, groupsActions };
