import { Box, Stack } from "@mui/material";
import { PageNotFound } from "Pages/index";
import { Route, Routes } from "react-router-dom";

import "Assets/App.css";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import Navigator from "Layouts/Navigator";
import Notification from "Layouts/Notification";

import Ads from "Layouts/Ads";
import { MainRoute } from "Routes/MainRoute";

import { useAppSelector } from "hooks";

function App() {
    const notification = useAppSelector((state) => state.ui.notification);

    return (
        <Stack sx={{ minHeight: "100vh" }}>
            <Navbar />
            {notification.open && (
                <Notification type={notification.type} message={notification.message} />
            )}
            <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between">
                <Navigator />
                <Box flex={9}>
                    <Routes>
                        {MainRoute()}
                        {/* {UserRoute()} */}
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
