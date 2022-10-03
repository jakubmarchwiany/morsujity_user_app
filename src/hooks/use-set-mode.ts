import { useMediaQuery } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { appActions } from "store/app-slice";

export default function useSetMode() {
    const dispatch = useAppDispatch();
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    useEffect(() => {
        let mode: string | null = localStorage.getItem("mode");
        if (mode !== null) {
            mode = <string>JSON.parse(mode);
            if (mode === "dark") dispatch(appActions.setMode(mode));
        } else {
            mode = prefersDarkMode ? "dark" : "light";
            if (mode === "dark") dispatch(appActions.setMode(mode));
        }
    }, []);
}
