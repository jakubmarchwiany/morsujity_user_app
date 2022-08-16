import { useAppSelector } from "hooks/redux";
import { Navigate, Outlet } from "react-router-dom";

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
