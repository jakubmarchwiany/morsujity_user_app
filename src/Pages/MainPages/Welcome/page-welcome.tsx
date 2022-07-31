import { Grid } from "@mui/material";
import Welcome from "Components/Main/Welcome";
import { Helmet } from "react-helmet-async";

function PageWelcome() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta
                    name="description"
                    content="Witamj w Morsujity!
                    Morsuj dołączaj do grup.
                    Zdobywaj kolejne rangi!."
                />
                <link rel="canonical" href="/" />
            </Helmet>
            <Grid
                height={"100%"}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Welcome />
            </Grid>
        </>
    );
}

export default PageWelcome;
