import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useLocalStorageState<T>(
    key: string,
    initialValue: T,
): [T, Dispatch<React.SetStateAction<T>>] {
    const storedValue = localStorage.getItem(key);
    const initial: T = storedValue ? JSON.parse(storedValue) : initialValue;

    const [state, setState] = useState<T>(initial);

    const updateState = (newValue: SetStateAction<T>) => {
        setState(newValue);

        localStorage.setItem(key, JSON.stringify(newValue));
    };

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setState(JSON.parse(storedValue));
        }
    }, [key]);

    return [state, updateState];
}

export default useLocalStorageState;
