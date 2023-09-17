import { ToggleButton } from "@mui/material";
import { MyToggleButtonGroup } from "components/my/MyToggleButtonGroup";
import { Dispatch } from "react";
import { ActivityTypes } from "store/statistics/statistics.slice";

type Props = {
    activityType: ActivityTypes;
    setActivityType: Dispatch<React.SetStateAction<ActivityTypes>>;
};

export function ActivityPicker({ activityType, setActivityType }: Props) {
    return (
        <MyToggleButtonGroup
            value={activityType}
            exclusive
            onChange={(event, value: ActivityTypes) => {
                if (value !== null) setActivityType(value);
            }}
            fullWidth
            sx={{ mt: 3 }}
        >
            <ToggleButton value={ActivityTypes.WinterSwiming}>Mors</ToggleButton>
            <ToggleButton value={ActivityTypes.ColdShower}>Zimny Prysznic</ToggleButton>
        </MyToggleButtonGroup>
    );
}
