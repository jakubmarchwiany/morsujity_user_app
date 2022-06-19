import { userActions } from "./user-slice";
import { uiActions } from "./ui-slice";

import { AppThunk } from "./index";

const endPoint: string | undefined = process.env.REACT_APP_API_ENDPOINT;

export const registerUserThunk =
    (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        navigate: any
    ): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + "/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "success",
                            message: data.message,
                        })
                    );
                    navigate("/login", { replace: true });
                } else {
                    AppDispatch(
                        uiActions.showNotification({
                            type: "error",
                            message: data.message,
                        })
                    );
                }
            })
            .catch((error) => {
                AppDispatch(
                    uiActions.showNotification({
                        type: "error",
                        message: error.message,
                    })
                );
            });
    };
