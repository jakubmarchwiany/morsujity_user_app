import NewActivity from "components/user/new-activity/NewActivity";
import { Helmet } from "react-helmet-async";

function PageNewActivity() {
    return (
        <>
            <Helmet>
                <title>Nowa aktywność</title>
                <meta name='description' content='Nowa aktywność Morsujity.' />
            </Helmet>

            <NewActivity />
        </>
    );
}
export default PageNewActivity;
