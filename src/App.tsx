import {
    createTheme,
    responsiveFontSizes,
    Stack,
    ThemeProvider,
    Unstable_Grid2 as Grid2,
} from "@mui/material";
import "assets/app.css";
import { getDesignTokens } from "assets/theme";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useSetMode from "hooks/use-set-mode";
import Cookies from "js-cookie";
import Ads from "layouts/Ads";
import Footer from "layouts/Footer";
import LoadingPage from "layouts/LoadingPage";
import Navbar from "layouts/Navbar";
import Navigator from "layouts/Navigator";
import Notification from "layouts/Notification";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import { PageNotFound } from "pages/index";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { mainRoute } from "routes/main-route";
import { userRoute } from "routes/user-route";
import { getUserData } from "store/user-actions";

function App() {
    const [loading, setLoading] = useState(true);
    const appMode = useAppSelector((state) => state.app.mode);

    const dispatch = useAppDispatch();
    const navigate = useStableNavigate();

    useSetMode();

    useEffect(() => {
        if (Cookies.get("Authorization") !== undefined) {
            dispatch(getUserData(navigate, setLoading));
        } else {
            setLoading(false);
        }
    }, []);

    const theme = useMemo(
        () => responsiveFontSizes(createTheme(getDesignTokens(appMode!))),
        [appMode],
    );

    const syncLogout = useCallback((event: StorageEvent) => {
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

    return loading ? (
        <LoadingPage />
    ) : (
        <ThemeProvider theme={theme}>
            <Stack height='100vh' display='flex' flexDirection='column'>
                <Navbar />
                <Grid2
                    container
                    flex={1}
                    overflow='auto'
                    columns={20}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                >
                    <Grid2 md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
                        <Navigator navbar={false} />
                    </Grid2>

                    <Grid2 xs={20} md={12} lg={14} bgcolor={"background.paper"}>
                        <Routes>
                            {mainRoute()}
                            {userRoute()}
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </Grid2>

                    <Grid2 md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
                        <Ads />
                    </Grid2>
                </Grid2>
                <Notification />
                <Footer />
            </Stack>
        </ThemeProvider>
    );
}
export default App;
