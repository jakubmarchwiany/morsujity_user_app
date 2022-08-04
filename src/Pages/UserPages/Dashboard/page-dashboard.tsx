import { Grid } from "@mui/material";
import Home from "Components/User/Home";
import { Helmet } from "react-helmet-async";

function PageDashboard() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta name="description" content="Strona główna Morsujity." />
                <link rel="canonical" href="/user/home" />
            </Helmet>

            <Home />
        </>
    );
}

export default PageDashboard;
