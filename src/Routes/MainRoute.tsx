import { Route, Navigate, useParams } from "react-router-dom";

import { PageRegister, PageLogin, PageHome } from "Pages/index";
import VerifyEmail from "Components/Main/VerifyEmail";

export function MainRoute() {
    return [
        <Route key="/" path="/" element={<Navigate replace to="/home" />} />,
        <Route key="/home" path="/home" element={<PageHome />} />,
        <Route key="/register" path="/register" element={<PageRegister />} />,
        <Route key="/login" path="/login" element={<PageLogin />} />,
        <Route key="/auth/verifyEmail" path="/auth/verifyEmail/:hash" element={<VerifyEmail />}/>,
        
    ];
}
