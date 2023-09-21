import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "store";
import { GroupType } from "store/user/group/group_type.type";
import { userActions } from "store/user/user.slice";
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
        postFetch<{ data: { _id: string; name: string } }>(
            { type, name, description, coordinates },
            "/groups/create",
        ).then(({ data }) => {
            appDispatch(userActions.createGroup(data));
            navigate(`/`, { replace: true });
        });
    };
