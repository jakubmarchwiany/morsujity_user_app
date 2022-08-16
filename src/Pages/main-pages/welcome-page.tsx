import Welcome from "components/main/Welcome";
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

            <Welcome />
        </>
    );
}

export default PageWelcome;
