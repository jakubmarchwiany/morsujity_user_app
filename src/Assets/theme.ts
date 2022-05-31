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
        },
        secondary: {
            main: "#15c630",
        },
        otherColor: {
            main: "#999",
        },
    },
});
