import { Button, Slider, TextField, ToggleButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import MyModal from "components/my/MyModal";
import MyToggleButtonGroup from "components/my/MyToggleButtonGroup";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import { useState } from "react";
import { newActivity } from "store/user-actions";
import { minMarks, minValueText, secMarks, secValueText } from "./marks";

function NewActivity() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMors, setIsMors] = useState(true);
    const [isToday, setIsToday] = useState(true);
    const [isExactDate, setIsExactDate] = useState(false);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(null);

    const userType = useAppSelector((state) => state.user.type);

    const dispatch = useAppDispatch();
    const navigate = useStableNavigate();

    const handleNewActivity = () => {
        let selectedDate = date!;
        let durationInSeconds = minutes * 60 + seconds;

        if (isExactDate) {
            selectedDate = selectedDate
                .set("hour", time!.hour())
                .set("minute", time!.minute())
                .set("second", time!.second());
        } else {
            selectedDate = selectedDate.set("hour", 0).set("minute", 0).set("second", 0);
        }
        dispatch(newActivity(isMors, selectedDate.format(), durationInSeconds, navigate));
    };

    const handleChangeMinutes = (event: Event, newValue: number | number[]) => {
        setMinutes(newValue as number);
    };

    const handleChangeSeconds = (event: Event, newValue: number | number[]) => {
        setSeconds(newValue as number);
    };

    const handleClose = () => {
        setIsOpen(false);
        navigate(`/${userType}/dashboard`, { replace: true });
    };

    return (
        <MyModal open={isOpen} onClose={handleClose}>
            <Stack>
                <Typography variant='h3' mb={3} textAlign='center'>
                    Nowa Aktywność
                </Typography>

                <MyToggleButtonGroup
                    color='secondary'
                    value={isMors}
                    exclusive
                    onChange={(event, value: boolean) => {
                        setIsMors(value!);
                    }}
                    fullWidth
                >
                    <ToggleButton value={true}>Mors</ToggleButton>
                    <ToggleButton value={false}>Zimny Prysznic</ToggleButton>
                </MyToggleButtonGroup>

                <Typography variant='h4' my={3} textAlign='center'>
                    Czas trwania
                </Typography>
                <Slider
                    min={0}
                    max={60}
                    name='durationInMin'
                    value={minutes}
                    onChange={handleChangeMinutes}
                    aria-label='Default'
                    valueLabelDisplay='auto'
                    getAriaValueText={minValueText}
                    valueLabelFormat={minValueText}
                    marks={minMarks}
                />

                <Slider
                    size='small'
                    defaultValue={0}
                    min={0}
                    max={60}
                    value={seconds}
                    onChange={handleChangeSeconds}
                    aria-label='Small'
                    valueLabelDisplay='auto'
                    getAriaValueText={secValueText}
                    valueLabelFormat={secValueText}
                    marks={secMarks}
                />

                <Typography variant='h4' my={3} textAlign='center'>
                    Data
                </Typography>

                <MyToggleButtonGroup
                    sx={{ mb: 3 }}
                    color='secondary'
                    value={isToday}
                    exclusive
                    onChange={(event, value: boolean) => {
                        setIsToday(value!);
                        setDate(dayjs());
                    }}
                    fullWidth
                >
                    <ToggleButton value={true}>Dzisiejsza</ToggleButton>
                    <ToggleButton value={false}>Inna</ToggleButton>
                </MyToggleButtonGroup>

                {!isToday && (
                    <StaticDatePicker
                        displayStaticWrapperAs='desktop'
                        openTo='day'
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue!);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                )}

                <MyToggleButtonGroup
                    sx={{ my: 3 }}
                    color='secondary'
                    value={isExactDate}
                    exclusive
                    onChange={(event, value: boolean) => {
                        setTime(null);
                        setIsExactDate(value!);
                    }}
                    fullWidth
                >
                    <ToggleButton value={true}>Dokładna</ToggleButton>
                    <ToggleButton value={false}>Nie dokładna</ToggleButton>
                </MyToggleButtonGroup>

                {isExactDate && (
                    <StaticTimePicker
                        displayStaticWrapperAs={"mobile"}
                        ampm={false}
                        value={time}
                        onChange={(newValue) => {
                            setTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        componentsProps={{ actionBar: { actions: [] } }}
                    />
                )}

                <Button
                    sx={{ mt: 2 }}
                    disabled={isExactDate ? (time === null ? true : false) : false}
                    variant='contained'
                    onClick={handleNewActivity}
                >
                    Dodaj
                </Button>
            </Stack>
        </MyModal>
    );
}
export default NewActivity;
