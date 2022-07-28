import { Grid } from "@mui/material";
import Home from "Components/User/Home";
import { Helmet } from "react-helmet-async";

function PageHome() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta name="description" content="Strona główna Morsujity." />
                <link rel="canonical" href="/user/home" />
            </Helmet>
            <Grid
                height={"100%"}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Home />
            </Grid>
        </>
    );
}

export default PageHome;
