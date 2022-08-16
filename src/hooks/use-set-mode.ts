import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { appActions } from "Store/app-slice";
import { useAppDispatch } from "hooks/redux";

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
