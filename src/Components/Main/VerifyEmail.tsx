import { useAppDispatch } from "hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailThunk } from "Store/user-actions";

function VerifyEmail() {
    let { token } = useParams();
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(verifyEmailThunk(token!, navigate));
    }, []);

    return <></>;
}

export default VerifyEmail;
