import Settings from "components/user/Settings";
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
