import { useAppDispatch } from "hooks/redux";
import Cookies from "js-cookie";
import { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserData } from "store/user.actions";

export function useStateIsLogged(): [boolean | undefined] {
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (Cookies.get("authorization") !== undefined) {
            dispatch(getUserData(setIsLogged));
        } else {
            toast.error("Zaloguj się", { duration: 2000 });
            setIsLogged(false);
        }
    }, []);

    return [isLogged];
}
