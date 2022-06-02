import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        otherColor: Palette["primary"];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        otherColor?: PaletteOptions["primary"];
    }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        otherColor: true;
    }
}

export const myTheme = createTheme({
    palette: {
        primary: {
            main: "#468faf",
            "50": "#e4f5fe",
            "100": "#bbe7fb",
            "200": "#92d8f7",
            "300": "#5dbee7",
            "500": "#5ab3de",
            "600": "#51a4ca",
            "700": "#4690af",
            "800": "#3d7c96",
            "900": "#2c5a69",
            dark: "#316F7A",
            light: "#d9f9ff",
        },
        secondary: {
            main: "#15c630",
        },
        otherColor: {
            main: "#999",
        },
    },
});
