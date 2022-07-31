import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useDispatch } from "react-redux";
import { uiActions } from "Store/ui-slice";
import { useAppSelector } from "hooks";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={15} ref={ref} variant="filled" {...props} />;
});

function Notification() {
    const dispatch = useDispatch();

    const notify = useAppSelector((state) => state.ui);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(uiActions.hideNotification());
    };

    return (
        <>
            {notify.open ? (
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    sx={{ mb: 5 }}
                    open={true}
                    autoHideDuration={notify.duration}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={notify.type} sx={{ width: "100%" }}>
                        {notify.message}
                    </Alert>
                </Snackbar>
            ) : (
                ""
            )}
        </>
    );
}

export default Notification;
