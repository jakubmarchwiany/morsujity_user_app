import { useMediaQuery } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { appActions } from "store/app-slice";

export default function useSetMode() {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        let mode = localStorage.getItem("mode");
        if (mode) {
            mode = JSON.parse(mode);
            dispatch(appActions.setMode(mode!));
        } else {
            mode = prefersDarkMode ? "dark" : "light";
            dispatch(appActions.setMode(mode));
        }
    }, [dispatch, prefersDarkMode]);
}
