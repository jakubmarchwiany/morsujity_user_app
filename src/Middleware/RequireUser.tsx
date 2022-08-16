import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "hooks/redux";

function RequireUser() {
    const user = useAppSelector((state) => state.user);
    if (user) {
        if (user.token && user.type === "user") {
            return <Outlet />;
        }
    }

    return <Navigate replace to="/login" />;
}

export default RequireUser;
