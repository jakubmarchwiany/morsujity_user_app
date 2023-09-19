import { Unstable_Grid2 as Grid2, Stack, ThemeProvider, useMediaQuery } from "@mui/material";
import "assets/app.css";
import { LoadingPage } from "components/loading_page/LoadingPage";
import { useAutoLogoutCallback } from "hooks/useAutoLogoutCallback";
import { useStateIsLogged } from "hooks/useIsLoggedState";
import { useStateThemeMode } from "hooks/useThemeModeState";
import { Ads } from "layouts/Ads";
import { Navbar } from "layouts/Navbar";
import { Navigator } from "layouts/Navigator";
import { NotFound } from "layouts/NotFound";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { groupRoute } from "routes/group.route";
import { mainRoute } from "routes/main.route";

export function App() {
    const [isLogged] = useStateIsLogged();
    const [themeMode, setThemeMode] = useStateThemeMode();

    useAutoLogoutCallback();

    const isBigScreen = useMediaQuery(themeMode.breakpoints.up("md"));

    return (
        <ThemeProvider theme={themeMode}>
            {isLogged ? (
                <Stack height='100vh' display='flex' flexDirection='column'>
                    <Navbar switchMode={setThemeMode} />
                    <Grid2
                        container
                        flex={1}
                        overflow='auto'
                        columns={20}
                        bgcolor={"background.default"}
                        color={"primary.contrastText"}
                    >
                        {isBigScreen && (
                            <Grid2 md={4} lg={3} mt={2}>
                                <Navigator />
                            </Grid2>
                        )}

                        <Grid2 xs={20} md={12} lg={14} bgcolor={"background.paper"}>
                            <Routes>
                                {mainRoute()}
                                {groupRoute()}
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
                        background: themeMode.palette.background.default,
                        color: themeMode.palette.primary.contrastText,
                        // minWidth: "100vw",
                        maxWidth: "100vw",
                    },
                }}
            />
        </ThemeProvider>
    );
}
