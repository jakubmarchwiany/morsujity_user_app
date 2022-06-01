import { Grid } from "@mui/material";
import Login from "Components/Main/Login";
import React from "react";

function PageLogin() {
    return (
        <Grid height={"100%"} container direction="column" alignItems="center">
            <Login />
        </Grid>
    );
}

export default PageLogin;
