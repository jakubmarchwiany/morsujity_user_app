import { Grid } from "@mui/material";
import Register from "Components/Main/Register";
import React from "react";

function PageRegister() {
    return (
        <Grid
            height={"100%"}
            container
            direction="column"
            alignItems="center"
        >
            <Register />
        </Grid>
    );
}

export default PageRegister;
