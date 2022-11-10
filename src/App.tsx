import {
    createTheme,
    responsiveFontSizes,
    Stack,
    ThemeProvider,
    Unstable_Grid2 as Grid2,
    useMediaQuery,
} from "@mui/material";
import "assets/app.css";
import { getDesignTokens } from "assets/theme";
import NotFound from "components/main/NotFound";
import { useAppDispatch } from "hooks/redux";
import useSetMode from "hooks/use-set-mode";
import Cookies from "js-cookie";
import Ads from "layouts/Ads";
import Footer from "layouts/Footer";
import LoadingPage from "layouts/LoadingPage";
import Navbar from "layouts/Navbar";
import Navigator from "layouts/Navigator";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { userRoute } from "routes/user-route";
import { getUserData } from "store/user-actions";
import { authorizationFail, removeUserCookieAndRedirect } from "utils/fetches";

function App() {
    const [loading, setLoading] = useState(true);
    const [mode, setMode] = useSetMode();

    const { toasts } = useToasterStore();
    const dispatch = useAppDispatch();

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme(getDesignTokens(mode)));
    }, [mode]);

    const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {
        if (Cookies.get("Authentication") !== undefined) {
            dispatch(getUserData(setLoading));
        } else {
            authorizationFail();
        }
    }, []);

    // Enforce Limit
    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= 3) // Is toast index over limit
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
    }, [toasts]);

    const syncLogout = useCallback((event: StorageEvent) => {
        if (event.key === "logout") {
            removeUserCookieAndRedirect();
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
                <Navbar switchMode={setMode} />
                <Grid2
                    container
                    flex={1}
                    overflow='auto'
                    columns={20}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                >
                    {isBigScreen && (
                        <Grid2 md={4} lg={3} mt={2}>
                            <Navigator />
                        </Grid2>
                    )}

                    <Grid2
                        xs={20}
                        md={12}
                        lg={14}
                        bgcolor={"background.paper"}
                        py={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                    >
                        <Routes>
                            {userRoute()}
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </Grid2>

                    {isBigScreen && (
                        <Grid2 md={4} lg={3}>
                            <Ads />
                        </Grid2>
                    )}
                </Grid2>

                <Footer />
            </Stack>
            <Toaster
                position='bottom-center'
                gutter={10}
                // reverseOrder={true}
                containerStyle={{ marginBottom: "40px" }}
                toastOptions={{
                    style: {
                        background: theme.palette.background.default,
                        color: theme.palette.text.secondary,
                        minWidth: "250px",
                    },
                }}
            />
        </ThemeProvider>
    );
}

export default App;
