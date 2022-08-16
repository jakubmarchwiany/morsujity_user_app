import Login from "components/auth/Login";
import { Helmet } from "react-helmet-async";

function PageLogin() {
    return (
        <>
            <Helmet>
                <title>Logowanie</title>
                <meta name="description" content="Zaloguj się do swojego konta." />
                <link rel="canonical" href="/login" />
            </Helmet>

            <Login />
        </>
    );
}

export default PageLogin;
