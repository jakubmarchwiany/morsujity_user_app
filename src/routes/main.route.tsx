import { DashBoard } from "components/user/Dashboard";
import { CreateActivity } from "components/user/create-activity/CreateActivity";
import { Settings } from "components/user/settings/Settings";
import { Statistics } from "components/user/statistics/Statistics";
import { Route } from "react-router-dom";

export function mainRoute(): JSX.Element[] {
    return [
        <Route key="/" path="/">
            <Route key="/" path="/" element={<DashBoard />} />
            <Route key="create-activity" path="create-activity" element={<CreateActivity />} />
            <Route key="statistics" path="statistics" element={<Statistics />} />
            <Route key="settings" path="settings" element={<Settings />} />
        </Route>
    ];
}
