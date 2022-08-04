import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { PageNotFound } from "Pages/index";
import { Route, Routes, useNavigate } from "react-router-dom";

import "Assets/App.css";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import Navigator from "Layouts/Navigator";
import Notification from "Layouts/Notification";

import { getDesignTokens } from "Assets/theme";
import { useAppDispatch, useAppSelector } from "hooks";
import Cookies from "js-cookie";
import Ads from "Layouts/Ads";
import { useCallback, useEffect, useMemo } from "react";
import { MainRoute } from "Routes/MainRoute";
import { UserRoute } from "Routes/UserRoute";
import { appActions } from "Store/app-slice";
import { getUserDataThunk } from "Store/user-actions";

function App() {
    const mode = useAppSelector((state) => state.app.mode);
    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserDataThunk(navigate));
        if (Cookies.get("mode")) dispatch(appActions.setMode(Cookies.get("mode")!));

        // eslint-disable-next-line
    }, []);

    const syncLogout = useCallback((event: any) => {
        if (event.key === "logout") {
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Notification />
                <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between">
                    <Navigator />
                    <Box flex={9} bgcolor={"background.paper"} color={"text.primary"}>
                        <Routes>
                            {MainRoute()}
                            {UserRoute()}

                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Box>
                    <Ads />
                </Stack>
                <Footer />
            </Stack>
        </ThemeProvider>
    );
}

export default App;
