import { Grid } from "@mui/material";
import Welcome from "Components/Main/Welcome";

function PageHome() {
    return (
        <Grid
            height={"100%"}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Welcome />
        </Grid>
    );
}

export default PageHome;
