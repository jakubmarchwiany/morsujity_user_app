import RequireUser from "Middleware/RequireUser";
import { PageDashboard, PageSettings } from "Pages/index";
import { Route } from "react-router-dom";

export function UserRoute() {
    return [
        <Route key="/user" path="/user" element={<RequireUser />}>
            <Route key="dashboard" path="dashboard" element={<PageDashboard />} />
            <Route key="settings" path="settings" element={<PageSettings />} />
        </Route>,
    ];
}
