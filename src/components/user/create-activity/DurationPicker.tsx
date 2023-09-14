import { Slider, Typography } from "@mui/material";
import {
    minutesMarks,
    minutesValueText,
    secundsMarks,
    secundsValueText,
} from "components/user/create-activity/duration-marks";
import { Dispatch } from "react";

type Props = {
    durationInMinutes: number;
    durationInSeconds: number;
    setDurationInMinutes: Dispatch<React.SetStateAction<number>>;
    setDurationInSeconds: Dispatch<React.SetStateAction<number>>;
};

export function DurationPicker({
    durationInMinutes,
    durationInSeconds,
    setDurationInMinutes,
    setDurationInSeconds,
}: Props) {
    return (
        <>
            <Typography variant='h4' textAlign='center' mt={2}>
                Czas trwania
            </Typography>
            <Slider
                min={0}
                max={60}
                name='durationInMin'
                value={durationInMinutes}
                onChange={(event, newValue) => setDurationInMinutes(newValue as number)}
                aria-label='Default'
                valueLabelDisplay='auto'
                getAriaValueText={minutesValueText}
                valueLabelFormat={minutesValueText}
                marks={minutesMarks}
                sx={{ width: "90%", mt: 1 }}
            />
            <Slider
                size='small'
                defaultValue={0}
                min={0}
                max={59}
                value={durationInSeconds}
                onChange={(event, newValue) => setDurationInSeconds(newValue as number)}
                aria-label='Small'
                valueLabelDisplay='auto'
                getAriaValueText={secundsValueText}
                valueLabelFormat={secundsValueText}
                marks={secundsMarks}
                sx={{ width: "90%", mt: 1 }}
            />
        </>
    );
}
