type PaletteMode = "light" | "dark";

export type MyTheme = {
    palette: {
        mode: PaletteMode;
        primary: {
            main: string;
            contrastText: string;
        };
        secondary: {
            main: string;
            contrastText: string;
        };
        background: {
            default: string;
            paper: string;
        };
        divider: string;
        text: {
            primary: string;
            secondary: string;
        };
    };
    typography: {
        fontFamily: string;
    };
    breakpoints: {
        values: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
    };
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: string;
                };
            };
        };
        MuiButton: {
            styleOverrides: {
                root: {
                    color: string;
                };
            };
        };
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: string;
                    maxWidth: string;
                };
            };
        };
    };
};
