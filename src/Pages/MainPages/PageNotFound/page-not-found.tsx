import { Grid } from "@mui/material";
import NotFound from "Layouts/PageNotFound";
import { Helmet } from "react-helmet-async";

function PageNotFound() {
    return (
        <>
            <Helmet>
                <title>Strona nie znaleziona</title>
                <meta name="description" content="Strona nie znaleziona." />
            </Helmet>

            <NotFound />
        </>
    );
}

export default PageNotFound;
