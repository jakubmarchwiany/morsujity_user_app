import { useCallback, useEffect } from "react";

export function useAutoLogoutCallback() {
    const autoLogout = useCallback(async (event: StorageEvent) => {
        if (event.key === "logout") {
            location.reload();
        }
    }, []);

    useEffect(() => {
        window.addEventListener("storage", autoLogout);
        return () => {
            window.removeEventListener("storage", autoLogout);
        };
    }, [autoLogout]);
}
