import { DashBoard } from "components/user/Dashboard";
import NewActivity from "components/user/new-activity/NewActivity";
import { Settings } from "components/user/settings/Settings";
import { Statistics } from "components/user/statistics/Statistics";
import { Route } from "react-router-dom";

export function mainRoute() {
    return [
        <Route key='/' path='/'>
            <Route key='/' path='/' element={<DashBoard />} />
            <Route key='new-activity' path='new-activity' element={<NewActivity />} />
            <Route key='statistics' path='statistics' element={<Statistics />} />
            <Route key='settings' path='settings' element={<Settings />} />
        </Route>,
    ];
}
