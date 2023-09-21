import { PaletteMode, Theme, createTheme, responsiveFontSizes, useMediaQuery } from "@mui/material";
import { getDesignTokens } from "assets/theme";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark"
}

export function useStateThemeMode(): [Theme, () => void] {
    const [themeMode, setThemeMode] = useState<PaletteMode>(ThemeMode.LIGHT);

    const switchMode = (): void => {
        const newThemeMode = themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;

        setThemeMode(newThemeMode);
        localStorage.setItem("themeMode", JSON.stringify(newThemeMode));

        toast(newThemeMode === ThemeMode.LIGHT ? "Zapalam światło" : "Gasze światło", {
            icon: newThemeMode === ThemeMode.LIGHT ? "🌅" : "🌇"
        });
    };

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    useEffect(() => {
        const themeModeLocal: string | null = localStorage.getItem("themeMode");

        if (themeModeLocal !== null && themeModeLocal in ThemeMode) {
            setThemeMode(JSON.parse(themeModeLocal) as ThemeMode);
        } else {
            setThemeMode(prefersDarkMode ? "dark" : "light");
        }
    }, []);

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme(getDesignTokens(themeMode)));
    }, [themeMode]);

    return [theme, switchMode];
}
