import { Button, Container, Stack, Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { panelStandardSize } from "assets/theme";
import { ActivityPicker } from "components/user/create-activity/ActivityPicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "hooks/redux";
import useLocalStorageState from "hooks/useLocalStorageState";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import { useState } from "react";
import { createActivity } from "store/statistics/activity.actions";
import { ActivityType } from "store/statistics/activity_type.type";
import { DurationPicker } from "./DurationPicker";

export function CreateActivity(): JSX.Element {
    const [type, setType] = useLocalStorageState<ActivityType>(
        "activityType",
        ActivityType.ColdShower
    );

    const [durationInMinutes, setDurationInMinutes] = useLocalStorageState<number>(
        "durationInMinutes",
        5
    );
    const [durationInSeconds, setDurationInSeconds] = useLocalStorageState<number>(
        "durationInSeconds",
        0
    );

    const [activityDate, setActivityDate] = useState<Dayjs>(dayjs().startOf("day"));

    const dispatch = useAppDispatch();
    const navigate = useStableNavigate();

    const handleCreateActivity = (): void => {
        const totalDurationInSeconds = durationInMinutes * 60 + durationInSeconds;

        dispatch(createActivity(type, activityDate.toString(), totalDurationInSeconds, navigate));
    };

    return (
        <Container component="main" sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 3, md: 5 }} alignItems="center" width={panelStandardSize}>
                <Typography variant="h3" textAlign="center">
                    Dodaj Aktywność
                </Typography>

                <ActivityPicker activityType={type} setActivityType={setType} />

                <DurationPicker
                    durationInMinutes={durationInMinutes}
                    durationInSeconds={durationInSeconds}
                    setDurationInMinutes={setDurationInMinutes}
                    setDurationInSeconds={setDurationInSeconds}
                />

                <Typography variant="h4" mt={2} textAlign="center">
                    Data
                </Typography>
                <MobileDateTimePicker
                    defaultValue={activityDate}
                    onChange={(newValue) => {
                        newValue !== null && setActivityDate(newValue);
                    }}
                    ampm={false}
                    sx={{ width: "165px", mt: 1 }}
                />

                <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreateActivity} fullWidth>
                    Dodaj
                </Button>
            </Stack>
        </Container>
    );
}
