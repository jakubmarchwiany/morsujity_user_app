import Contact from "components/main/Contact";
import { Helmet } from "react-helmet-async";

function PageContact() {
    return (
        <>
            <Helmet>
                <title>Morsujity</title>
                <meta
                    name="description"
                    content="Strona kontaktowa. Napisz maila z pytanie. Staram sie odpisać jak najszybciej"
                />
                <link rel="canonical" href="/contact" />
            </Helmet>

            <Contact />
        </>
    );
}

export default PageContact;