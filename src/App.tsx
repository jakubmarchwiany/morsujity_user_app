import {
    Unstable_Grid2 as Grid2,
    Stack,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    useMediaQuery,
} from "@mui/material";
import "assets/app.css";
import { getDesignTokens } from "assets/theme";
import LoadingPage from "components/loading_page/LoadingPage";
import NotFound from "components/main/NotFound";
import { useAppDispatch } from "hooks/redux";
import useSetMode from "hooks/use-set-mode";
import Cookies from "js-cookie";
import Ads from "layouts/Ads";
import Navbar from "layouts/Navbar";
import Navigator from "layouts/Navigator";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { mainRoute } from "routes/main-route";
import { getUserData } from "store/user-actions";
import { logout } from "utils/useful";

function App() {
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
    const [mode, setMode] = useSetMode();

    const dispatch = useAppDispatch();

    const theme = useMemo(() => {
        return responsiveFontSizes(createTheme(getDesignTokens(mode)));
    }, [mode]);

    const isBigScreen = useMediaQuery(theme.breakpoints.up("md"));
    useEffect(() => {
        if (Cookies.get("authorization") !== undefined) {
            dispatch(getUserData(setIsLogged));
        } else {
            toast.error("Zaloguj się", { duration: 2000 });
            setIsLogged(false);
        }
    }, []);

    const syncLogout = useCallback((event: StorageEvent) => {
        if (event.key === "logout") {
            logout();
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
            {isLogged ? (
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
                                {mainRoute()}
                                <Route path='*' element={<NotFound />} />
                            </Routes>
                        </Grid2>

                        {isBigScreen && (
                            <Grid2 md={4} lg={3}>
                                <Ads />
                            </Grid2>
                        )}
                    </Grid2>
                    {/* <Footer /> */}
                </Stack>
            ) : (
                <LoadingPage isLogged={isLogged} />
            )}
            <Toaster
                position='bottom-center'
                gutter={10}
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
