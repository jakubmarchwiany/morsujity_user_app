import Contact from "components/main/Contact";
import Statut from "components/main/Statut";
import Statistics from "components/user/Statistics";
// import Account from "components/user/Account";
import DashBoard from "components/user/Dashboard";
import NewActivity from "components/user/new-activity/NewActivity";
import Settings from "components/user/Settings";
import { Route } from "react-router-dom";

export function mainRoute() {
    return [
        <Route key='/' path='/'>
            <Route key='/' path='/' element={<DashBoard />} />
            <Route key='new-activity' path='new-activity' element={<NewActivity />} />
            <Route key='statistics' path='statistics' element={<Statistics />} />
            <Route key='settings' path='settings' element={<Settings />} />
            <Route key='contact' path='contact' element={<Contact />} />,
            <Route key='statut' path='statut' element={<Statut />} />,
            {/* <Route key='blog' path='blog' element={<Blog />} />, */}
        </Route>,
    ];
}
