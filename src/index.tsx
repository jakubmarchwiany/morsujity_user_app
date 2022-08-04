import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
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
                <Router>
                    <App />
                </Router>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>
);
