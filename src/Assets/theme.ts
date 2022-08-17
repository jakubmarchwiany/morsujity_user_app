import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
        complementary: Palette["primary"];
    }

    interface PaletteOptions {
        complementary?: PaletteOptions["primary"];
    }
}

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                  // palette values for light mode
                  primary: {
                      main: "#468faf",
                  },
                  secondary: {
                      main: "#000",
                  },
                  complementary: {
                      main: "#AF6646",
                  },
                  background: {
                      default: "#fff",
                      paper: "#fafafa",
                  },
                  divider: "#fff",
                  text: {
                      primary: "#000",
                      secondary: "#468faf",
                  },
              }
            : {
                  // palette values for dark mode
                  primary: {
                      main: "#2c5a69",
                  },
                  secondary: {
                      main: "#fff",
                  },
                  complementary: {
                      main: "#693B2C",
                  },
                  background: {
                      default: "#303030",
                      paper: "#424242",
                  },
                  divider: "#000",
                  text: {
                      primary: "#fff",
                      secondary: "#fff",
                  },
              }),
    },
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 481,
            md: 769,
            lg: 1025,
            xl: 1200,
        },
    },
});

//Light mode
// "50": "#e4f5fe",
// "100": "#bbe7fb",
// "200": "#92d8f7",
// "300": "#5dbee7",
// "500": "#5ab3de",
// "600": "#51a4ca",
// "700": "#4690af",
// "800": "#3d7c96",
// "900": "#2c5a69",

//Dark mode
// "50": "#e4f5fe",
// "100": "#bbe7fb",
// "200": "#92d8f7",
// "300": "#5dbee7",
// "500": "#5ab3de",
// "600": "#51a4ca",
// "700": "#4690af",
// "800": "#3d7c96",
// "900": "#2c5a69",
