import RequireUser from "Middleware/RequireUser";
import { PageHome } from "Pages/index";
import { Route } from "react-router-dom";

export function UserRoute() {
    return [
        <Route key="/user" path="/user" element={<RequireUser />}>
            <Route key="home" path="home" element={<PageHome />} />
        </Route>,
    ];
}
