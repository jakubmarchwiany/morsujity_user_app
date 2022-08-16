import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "Store/auth-actions";

function VerifyEmail() {
    let { token } = useParams();
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyEmail(token!, navigate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
}

export default VerifyEmail;
