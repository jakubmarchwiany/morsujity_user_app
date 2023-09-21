import { Dispatch, SetStateAction, useState } from "react";

function useLocalStorageState<T>(
    key: string,
    initialValue: T
): [T, Dispatch<React.SetStateAction<T>>] {
    const storedValue = localStorage.getItem(key);
    const initial: T = storedValue !== null ? JSON.parse(storedValue) : initialValue;

    const [state, setState] = useState<T>(initial);

    const updateState = (newValue: SetStateAction<T>): void => {
        setState(newValue);

        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [state, updateState];
}

export default useLocalStorageState;
