import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StableNavigateContextProvider } from "middleware/StableNavigateContextProvider";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/index";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <BrowserRouter>
                    <StableNavigateContextProvider>
                        <App />
                    </StableNavigateContextProvider>
                </BrowserRouter>
            </Provider>
        </LocalizationProvider>
    </StrictMode>,
);
