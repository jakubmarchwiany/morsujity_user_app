import { Box, Stack } from "@mui/material";
import { PageNotFound } from "Pages/index";
import { Route, Routes, useNavigate } from "react-router-dom";

import "Assets/App.css";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import Navigator from "Layouts/Navigator";
import Notification from "Layouts/Notification";

import { useAppDispatch } from "hooks";
import Ads from "Layouts/Ads";
import { useCallback, useEffect } from "react";
import { MainRoute } from "Routes/MainRoute";
import { UserRoute } from "Routes/UserRoute";
import { getUserDataThunk } from "Store/user-actions";

function App() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUserDataThunk(navigate));
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
        <Stack sx={{ minHeight: "100vh" }}>
            <Navbar />
            <Notification />
            <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between">
                <Navigator />
                <Box flex={9}>
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
    );
}

export default App;
