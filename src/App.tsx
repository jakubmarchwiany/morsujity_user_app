import React from "react";
import { Stack, ThemeProvider } from "@mui/material";

import "./Assets/App.css";
import Navbar from "./Layouts/Navbar";
import { myTheme } from "./Assets/theme";
import Footer from "./Layouts/Footer";
import Navigator from "./Layouts/Navigator";
import Content from "./Layouts/Content";
import Ads from "./Layouts/Ads";

function App() {
    return (
        <ThemeProvider theme={myTheme}>
            <Stack sx={{minHeight: "100vh"}}>
                <Navbar />
                <Stack sx={{flex: 1}} direction="row" justifyContent="space-between">
                    <Navigator />
                    <Content />
                    <Ads />
                </Stack>
                <Footer />
            </Stack>
        </ThemeProvider>
    );
}

export default App;
