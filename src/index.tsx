import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@mui/material";
import { myTheme } from "Assets/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "Store/index";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <ThemeProvider theme={myTheme}>
                    <Router>
                        <App />
                    </Router>
                </ThemeProvider>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
