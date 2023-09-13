import { Button, Container, Stack, Typography } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { panelStandardSize } from "assets/theme";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "hooks/redux";
import useLocalStorageState from "hooks/useLocalStorageState";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import { useState } from "react";
import { newActivity } from "store/user.actions";
import { ActivityPicker, ActivityTypes } from "./ActivityPicker";
import { DurationPicker } from "./DurationPicker";

function NewActivity() {
    const [activityType, setActivityType] = useLocalStorageState<ActivityTypes>(
        "activityType",
        ActivityTypes.ColdShower,
    );

    const [durationInMinutes, setDurationInMinutes] = useLocalStorageState<number>(
        "durationInMinutes",
        5,
    );
    const [durationInSeconds, setDurationInSeconds] = useLocalStorageState<number>(
        "durationInSeconds",
        0,
    );

    const [activityDate, setActivityDate] = useState<Dayjs>(dayjs().startOf("day"));

    const dispatch = useAppDispatch();
    const navigate = useStableNavigate();

    const handleNewActivity = () => {
        dispatch(newActivity(activityType, activityDate.toString(), durationInSeconds, navigate));
    };

    console.log(activityType, durationInMinutes, durationInSeconds, activityDate);

    return (
        <Container component='main' sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 5, md: 10 }} alignItems='center' width={panelStandardSize}>
                <Typography variant='h3' textAlign='center'>
                    Nowa Aktywność
                </Typography>

                <ActivityPicker activityType={activityType} setActivityType={setActivityType} />

                <Typography variant='h4' textAlign='center' mt={2}>
                    Czas trwania
                </Typography>

                <DurationPicker
                    durationInMinutes={durationInMinutes}
                    durationInSeconds={durationInSeconds}
                    setDurationInMinutes={setDurationInMinutes}
                    setDurationInSeconds={setDurationInSeconds}
                />

                <Typography variant='h4' mt={2} textAlign='center'>
                    Data
                </Typography>

                <MobileDateTimePicker
                    defaultValue={activityDate}
                    onChange={(newValue) => newValue && setActivityDate(newValue)}
                    ampm={false}
                    sx={{ width: "165px", mt: 1 }}
                />

                <Button variant='contained' sx={{ mt: 2 }} onClick={handleNewActivity} fullWidth>
                    Dodaj
                </Button>
            </Stack>
        </Container>
    );
}
export default NewActivity;
