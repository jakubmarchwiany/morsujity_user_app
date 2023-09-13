import { useCallback, useEffect } from "react";
import { logout } from "utils/useful";

export function useAutoLogoutCallback() {
    const autoLogout = useCallback((event: StorageEvent) => {
        if (event.key === "logout") {
            logout();
        }
    }, []);
    
    useEffect(() => {
        window.addEventListener("storage", autoLogout);
        return () => {
            window.removeEventListener("storage", autoLogout);
        };
    }, [autoLogout]);
}
