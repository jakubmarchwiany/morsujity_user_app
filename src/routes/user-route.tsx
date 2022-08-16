import RequireUser from "middleware/RequireUser";
import { PageDashboard, PageSettings } from "pages/index";
import { Route } from "react-router-dom";

export function userRoute() {
    return [
        <Route key="/user" path="/user" element={<RequireUser />}>
            <Route key="dashboard" path="dashboard" element={<PageDashboard />} />
            <Route key="settings" path="settings" element={<PageSettings />} />
        </Route>,
    ];
}
