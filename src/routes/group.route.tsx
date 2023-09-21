import { CreateGroup } from "components/group/create_group/CreateGroup";
import { Route } from "react-router-dom";

export function groupRoute(): JSX.Element[] {
    return [
        <Route key="/group" path="/group">
            <Route key="create" path="create" element={<CreateGroup />} />
        </Route>
    ];
}
