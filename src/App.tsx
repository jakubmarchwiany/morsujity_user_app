import { ThemeProvider } from "@mui/material";
import "assets/app.css";
import { LoadingPage } from "components/loading_page/LoadingPage";
import { useAutoLogoutCallback } from "hooks/useAutoLogoutCallback";
import { useStateIsLogged } from "hooks/useIsLoggedState";
import { useStateThemeMode } from "hooks/useThemeModeState";
import { Main } from "layouts/Main";
import { Toaster } from "react-hot-toast";

export function App(): JSX.Element {
    const [isLogged] = useStateIsLogged();
    const [themeMode, setThemeMode] = useStateThemeMode();

    useAutoLogoutCallback();

    return (
        <ThemeProvider theme={themeMode}>
            {isLogged !== undefined && isLogged ? (
                <Main themeMode={themeMode} setThemeMode={setThemeMode} />
            ) : (
                <LoadingPage isLogged={isLogged} />
            )}
            <Toaster
                position="bottom-center"
                gutter={10}
                containerStyle={{ marginBottom: "40px" }}
                toastOptions={{
                    style: {
                        background: themeMode.palette.background.default,
                        color: themeMode.palette.primary.contrastText,
                        // minWidth: "100vw",
                        maxWidth: "100vw"
                    }
                }}
            />
        </ThemeProvider>
    );
}
