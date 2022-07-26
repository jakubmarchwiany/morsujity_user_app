import { Grid } from "@mui/material";
import Statut from "Components/Main/Statut";
import Welcome from "Components/Main/Welcome";
import { Helmet } from "react-helmet-async";

function PageStatut() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta
                    name="description"
                    content="Regulamin korzystania z serwisu. Zasady"
                />
                <link rel="canonical" href="/statut" />
            </Helmet>
            <Grid
                height={"100%"}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Statut />
            </Grid>
        </>
    );
}

export default PageStatut;
