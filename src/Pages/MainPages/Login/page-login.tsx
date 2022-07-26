import { Grid } from "@mui/material";
import Login from "Components/Main/Login";
import { Helmet } from "react-helmet-async";

function PageLogin() {
    return (
        <>
            <Helmet>
                <title>Logowanie</title>
                <meta name="description" content="Zaloguj się do swojego konta." />
                <link rel="canonical" href="/login" />
            </Helmet>
            <Grid height={"100%"} container direction="column" alignItems="center">
                <Login />
            </Grid>
        </>
    );
}

export default PageLogin;
