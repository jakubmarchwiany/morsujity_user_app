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
        navigate: any,
    ): AppThunk =>
    async (AppDispatch) => {
        fetch(endPoint + "/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    AppDispatch(
                        userActions.login({
                            token: data.token,
                            account: data.user,
                        })
                    );
                    AppDispatch(
                        uiActions.showNotification({
                            open: true,
                            type: "success",
                            message: "Udało się utworzyć konto",
                        })
                    );
                    // navigate("/user/home", { replace: true });
                } else {
                    if (response.status === 400) {
                        const data = await response.json();
                        console.log(data)
                    } else {
                        
                    }
                }
            })
            .catch((error) => {
              
            });
    };
