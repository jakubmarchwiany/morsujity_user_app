import { Box, createTheme, responsiveFontSizes, Stack, ThemeProvider } from "@mui/material";
import "assets/app.css";
import { getDesignTokens } from "assets/theme";
import { useAppSelector } from "hooks/redux";
import useSetMode from "hooks/use-set-mode";
import Ads from "layouts/Ads";
import Footer from "layouts/Footer";
import Navbar from "layouts/Navbar";

import Navigator from "layouts/Navigator";
import Notification from "layouts/Notification";
import { PageNotFound } from "pages/index";
import { useCallback, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { mainRoute } from "routes/main-route";
import { userRoute } from "routes/user-route";

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
                            {mainRoute()}
                            {userRoute()}
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
