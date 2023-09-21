import { createContext, MutableRefObject, useContext, useRef } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const StableNavigateContext = createContext<MutableRefObject<NavigateFunction> | null>(null);

type Props = {
    children: JSX.Element;
};

const StableNavigateContextProvider = ({ children }: Props): JSX.Element => {
    const navigate = useNavigate();
    const navigateRef = useRef(navigate);

    return (
        <StableNavigateContext.Provider value={navigateRef}>
            {children}
        </StableNavigateContext.Provider>
    );
};

const useStableNavigate = (): NavigateFunction => {
    const navigateRef = useContext(StableNavigateContext);

    if (navigateRef !== null && navigateRef !== null) return navigateRef.current;

    throw new Error("StableNavigate context is not initialized");
};

export { StableNavigateContext, StableNavigateContextProvider, useStableNavigate };
