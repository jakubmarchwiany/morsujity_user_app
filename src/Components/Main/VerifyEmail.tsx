import { useAppDispatch } from "hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailThunk } from "Store/user-actions";

function VerifyEmail() {
    let { hash } = useParams();
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(verifyEmailThunk(hash!, navigate));
        
    }, []);

    return <></>;
}

export default VerifyEmail;
