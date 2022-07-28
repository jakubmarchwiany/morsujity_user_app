import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "hooks";
import { RootState } from "Store";
import { Children } from "react";

function RequireUser() {
    const user = useAppSelector((state) => state.user);
    if (user) {
        if (user.token && user.data?.type == "user") {
            return <Outlet />;
        }
    }

    return <Navigate replace to="/login" />;
}

export default RequireUser;
