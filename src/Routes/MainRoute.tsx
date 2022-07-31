import NewPassword from "Components/Main/NewPassword";
import VerifyEmail from "Components/Main/VerifyEmail";
import {
    PageBlog,
    PageContact,
    PageLogin,
    PageRegister,
    PageStatut,
    PageWelcome,
} from "Pages/index";
import { Route } from "react-router-dom";

export function MainRoute() {
    return [
        <Route key="/" path="/" element={<PageWelcome />} />,
        <Route key="/login" path="/login" element={<PageLogin />} />,
        <Route key="/register" path="/register" element={<PageRegister />} />,
        <Route key="/contact" path="/contact" element={<PageContact />} />,
        <Route key="/statut" path="/statut" element={<PageStatut />} />,
        <Route key="/blog" path="/blog" element={<PageBlog />} />,
        <Route key="/verifyEmail" path="/verifyEmail/:token" element={<VerifyEmail />} />,
        <Route key="/resetPassword" path="/resetPassword/:token" element={<NewPassword />} />,
    ];
}
