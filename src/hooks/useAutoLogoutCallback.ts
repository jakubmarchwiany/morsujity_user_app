import { useCallback, useEffect } from "react";

export function useAutoLogoutCallback(): void {
    const autoLogout = useCallback((event: StorageEvent) => {
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
