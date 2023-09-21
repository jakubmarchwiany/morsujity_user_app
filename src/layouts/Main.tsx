import { useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Stack, Theme } from "@mui/system";
import { Ads } from "layouts/Ads";
import { Navbar } from "layouts/Navbar";
import { Navigator } from "layouts/Navigator";
import { NotFound } from "layouts/NotFound";
import { Route, Routes } from "react-router";
import { groupRoute } from "routes/group.route";
import { mainRoute } from "routes/main.route";

type Props = {
    themeMode: Theme;
    setThemeMode: () => void;
};

export function Main({ themeMode, setThemeMode }: Props): JSX.Element {
    const isBigScreen = useMediaQuery(themeMode.breakpoints.up("md"));

    return (
        <Stack height="100vh" display="flex" flexDirection="column">
            <Navbar switchMode={setThemeMode} />
            <Grid2
                container
                flex={1}
                overflow="auto"
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
                        <Route path="*" element={<NotFound />} />
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
    );
}
