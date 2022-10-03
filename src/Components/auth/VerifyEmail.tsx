import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "store/auth-actions";

function VerifyEmail() {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyEmail(token!, navigate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}
export default VerifyEmail;
