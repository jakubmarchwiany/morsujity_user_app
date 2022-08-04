import { Grid } from "@mui/material";
import Statut from "Components/Main/Statut";
import { Helmet } from "react-helmet-async";

function PageStatut() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta name="description" content="Regulamin korzystania z serwisu. Zasady" />
                <link rel="canonical" href="/statut" />
            </Helmet>

            <Statut />
        </>
    );
}

export default PageStatut;
