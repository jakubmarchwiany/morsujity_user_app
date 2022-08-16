import { PaletteMode } from "@mui/material";

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";

// declare module "@mui/material/styles" {
//     interface Palette {
//         otherColor: Palette["primary"];
//     }

//     // allow configuration using `createTheme`
//     interface PaletteOptions {
//         otherColor?: PaletteOptions["primary"];
//     }
// }

// // Update the Button's color prop options
// declare module "@mui/material/Button" {
//     interface ButtonPropsColorOverrides {
//         otherColor: true;
//     }
// }

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
                      main: "#468faf",
                  },
                  complementary: {
                      main: "#AF6646",
                  },
                  neutral: {
                      main: "#66A6C2",
                  },
                  background: {
                      default: "#fff",
                      paper: "#fafafa",
                      dark: "#f5f5f5",
                  },
                  divider: "#fff",
                  text: {
                      primary: "#000",
                      secondary: "#000",
                      color: "#468faf",
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
                  neutral: {
                      main: "#3B798D",
                  },
                  background: {
                      default: "#303030",
                      paper: "#424242",
                      light: "#616161",
                  },
                  divider: "#000",
                  text: {
                      primary: "#fff",
                      secondary: "#fff",
                      color: "#fff",
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
    components: {
        ...(mode === "light"
            ? {
                  MuiTextField: {
                      styleOverrides: {
                          root: {
                              input: { backgroundColor: "#f5f5f5" },
                          },
                      },
                  },
              }
            : {
                  MuiTextField: {
                      styleOverrides: {
                          root: {
                              input: { backgroundColor: "#616161" },
                          },
                      },
                  },
              }),
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
