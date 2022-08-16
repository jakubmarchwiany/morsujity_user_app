import Settings from "Components/User/Settings";
import { Helmet } from "react-helmet-async";

function PageSettings() {
    return (
        <>
            <Helmet>
                <title>Ustawienia</title>
                <meta name="description" content="Ustawienia" />
            </Helmet>

            <Settings />
        </>
    );
}

export default PageSettings;
