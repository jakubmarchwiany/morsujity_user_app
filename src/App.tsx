import { Box, createTheme, responsiveFontSizes, Stack, ThemeProvider } from "@mui/material";
import "Assets/App.css";
import { getDesignTokens } from "Assets/theme";
import { useAppSelector } from "hooks/redux";
import useSetMode from "hooks/use-set-mode";
import Ads from "Layouts/Ads";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";

import Navigator from "Layouts/Navigator";
import Notification from "Layouts/Notification";
import { PageNotFound } from "Pages/index";
import { useCallback, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { MainRoute } from "Routes/MainRoute";
import { UserRoute } from "Routes/UserRoute";

function App() {
    useSetMode();
    const appMode = useAppSelector((state) => state.app.mode);

    const theme = useMemo(
        () => responsiveFontSizes(createTheme(getDesignTokens(appMode!))),
        [appMode]
    );

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

    console.log("app render");

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between">
                    <Box
                        flex={2}
                        sx={{ display: { xs: "none", lg: "block" } }}
                        bgcolor={"background.default"}
                        color={"text.primary"}
                    >
                        <Navigator navbar={false} />
                    </Box>
                    <Box flex={9} bgcolor={"background.paper"} color={"text.primary"}>
                        <Routes>
                            {MainRoute()}
                            {UserRoute()}
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Box>
                    <Ads />
                </Stack>
                <Notification />
                <Footer />
            </Stack>
        </ThemeProvider>
    );
}
export default App;
