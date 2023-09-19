import { CreateGroup } from "components/group/CreateGroup";
import { Route } from "react-router-dom";

export function groupRoute() {
    return [
        <Route key='/group' path='/group'>
            <Route key='create' path='create' element={<CreateGroup />} />
        </Route>,
    ];
}
