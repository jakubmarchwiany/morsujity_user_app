import {
    Button,
    Container,
    Slider,
    Stack,
    TextField,
    ToggleButton,
    Typography,
} from "@mui/material";
import { StaticDatePicker, StaticTimePicker } from "@mui/x-date-pickers";
import MyToggleButtonGroup from "components/my/MyToggleButtonGroup";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "hooks/redux";
import { useStableNavigate } from "middleware/StableNavigateContextProvider";
import { useState } from "react";
import { newActivity } from "store/user-actions";
import {
    handleChangeMinutes,
    handleChangeSeconds,
    minMarks,
    minValueText,
    secMarks,
    secValueText,
} from "./marks";

function NewActivity() {
    const [isMors, setIsMors] = useState(true);
    const [isToday, setIsToday] = useState(true);
    const [isExactDate, setIsExactDate] = useState(false);
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState<Dayjs | null>(null);

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

    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 30 },
            }}
        >
            <Stack px={5} py={3} borderRadius={5} boxShadow={5}>
                <Typography variant='h3' mb={3} textAlign='center'>
                    Nowa Aktywność
                </Typography>

                <MyToggleButtonGroup
                    color='secondary'
                    value={isMors}
                    exclusive
                    onChange={(event, value: boolean) => {
                        if (value !== null) setIsMors(value!);
                    }}
                    fullWidth
                >
                    <ToggleButton value={true}>Mors</ToggleButton>
                    <ToggleButton value={false}>Zimny Prysznic</ToggleButton>
                </MyToggleButtonGroup>

                <Typography variant='h4' my={2} textAlign='center'>
                    Czas trwania
                </Typography>
                <Slider
                    min={0}
                    max={60}
                    name='durationInMin'
                    value={minutes}
                    onChange={(event, newValue) => handleChangeMinutes(newValue, setMinutes)}
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
                    onChange={(event, newValue) => handleChangeSeconds(newValue, setSeconds)}
                    aria-label='Small'
                    valueLabelDisplay='auto'
                    getAriaValueText={secValueText}
                    valueLabelFormat={secValueText}
                    marks={secMarks}
                />

                <Typography variant='h4' my={2} textAlign='center'>
                    Data
                </Typography>

                <MyToggleButtonGroup
                    color='secondary'
                    value={isToday}
                    exclusive
                    onChange={(event, value: boolean) => {
                        if (value !== null) {
                            setIsToday(value!);
                            setDate(dayjs());
                        }
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
                    color='secondary'
                    value={isExactDate}
                    exclusive
                    onChange={(event, value: boolean) => {
                        if (value !== null) {
                            setTime(null);
                            setIsExactDate(value!);
                        }
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
                    variant='contained'
                    sx={{ mt: 2 }}
                    disabled={isExactDate ? (time === null ? true : false) : false}
                    onClick={handleNewActivity}
                    fullWidth
                >
                    Dodaj
                </Button>
            </Stack>
        </Container>
    );
}
export default NewActivity;
