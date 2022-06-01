import React from "react";
import { Box, Stack, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import { PageNotFound } from "Pages/index";

import "Assets/App.css";
import Navbar from "Layouts/Navbar";
import { myTheme } from "Assets/theme";
import Footer from "Layouts/Footer";
import Navigator from "Layouts/Navigator";

import Ads from "Layouts/Ads";
import { MainRoute } from "Routes/MainRoute";

function App() {
    return (
        <ThemeProvider theme={myTheme}>
            <Stack sx={{ minHeight: "100vh" }}>
                <Navbar />
                <Stack sx={{ flex: 1 }} direction="row" justifyContent="space-between">
                    <Navigator />
                    <Box bgcolor="yellow" flex={9} p={2}>
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
        </ThemeProvider>
    );
}

export default App;
