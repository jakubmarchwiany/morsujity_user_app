import Contact from "components/main/Contact";
import Statut from "components/main/Statut";
import DashBoard from "components/user/Dashboard";
import NewActivity from "components/user/new-activity/NewActivity";
import Settings from "components/user/Settings";
import { Route } from "react-router-dom";

export function userRoute() {
    return [
        <Route key='/user' path='/user'>
            <Route key='dashboard' path='dashboard' element={<DashBoard />} />
            <Route key='new-activity' path='new-activity' element={<NewActivity />} />
            <Route key='settings' path='settings' element={<Settings />} />
            <Route key='contact' path='contact' element={<Contact />} />,
            <Route key='statut' path='statut' element={<Statut />} />,
            {/* <Route key='blog' path='blog' element={<Blog />} />, */}
        </Route>,
    ];
}
