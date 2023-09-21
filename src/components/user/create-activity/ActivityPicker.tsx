import { ToggleButton } from "@mui/material";
import { MyToggleButtonGroup } from "components/my/MyToggleButtonGroup";
import { Dispatch } from "react";
import { ActivityType } from "store/statistics/activity_type.type";

type Props = {
    activityType: ActivityType;
    setActivityType: Dispatch<React.SetStateAction<ActivityType>>;
};

export function ActivityPicker({ activityType, setActivityType }: Props): JSX.Element {
    return (
        <MyToggleButtonGroup
            value={activityType}
            exclusive
            onChange={(event, value: ActivityType) => {
                if (value !== null) setActivityType(value);
            }}
            fullWidth
            sx={{ mt: 3 }}
        >
            <ToggleButton value={ActivityType.WinterSwiming}>Mors</ToggleButton>
            <ToggleButton value={ActivityType.ColdShower}>Zimny Prysznic</ToggleButton>
        </MyToggleButtonGroup>
    );
}
