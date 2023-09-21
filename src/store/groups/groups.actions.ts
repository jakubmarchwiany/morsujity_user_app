import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { GroupType } from "store/groups/group_type.type";
import { postFetch } from "utils/fetches";

export const createGroup =
    (
        type: GroupType,
        name: string,
        description: string,
        coordinates: [number, number],
        navigate: NavigateFunction,
    ): AppThunk =>
    (appDispatch) => {
        postFetch<{}>({ type, name, description, coordinates }, "/groups/create").then(({}) => {
            navigate(`/`, { replace: true });
        });
    };
