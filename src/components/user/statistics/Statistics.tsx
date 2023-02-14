import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Stack,
    Tooltip,
    Typography,
    Unstable_Grid2,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getAllActivity } from "store/user-actions";
import { displayTime } from "utils/useful";
import ActivityTable from "./ActivityTable";

function Statistics() {
    const s = useAppSelector((state) => state.user.statistics);
    const dispatch = useAppDispatch();

    const sumTime = s?.timeColdShowers! + s?.timeMorses!;

    const getAllActivies = () => {
        dispatch(getAllActivity());
    };

    console.log(s);

    return (
        <Container
            maxWidth={false}
            component='main'
            sx={
                {
                    // px: { xs: 0, sm: 10, md: 5, lg: 10, xl: 50 },
                    // px:"20%"
                }
            }
        >
            <Stack p={5} borderRadius={2} boxShadow={2}>
                <Divider>
                    <Typography variant='h3' fontWeight={"bold"} textAlign='center'>
                        Statystyki
                    </Typography>
                </Divider>

                <Unstable_Grid2 container mt={5}>
                    <Unstable_Grid2 xs={12} xl={4}>
                        <Divider textAlign='left'>
                            <Typography variant='h5' fontWeight={"bold"} textAlign='center'>
                                Czasy
                            </Typography>
                        </Divider>

                        <Typography variant='body1' fontWeight={"bold"} mt={2}>
                            Morsy: {displayTime(s!.timeMorses)}{" "}
                        </Typography>
                        <Typography variant='body1' fontWeight={"bold"} mt={1} mb={3}>
                            Zimne prysznice: {displayTime(s!.timeColdShowers)}
                        </Typography>

                        <Divider textAlign='left'>
                            <Typography variant='h5' fontWeight={"bold"} textAlign='center'>
                                Ranga
                            </Typography>
                        </Divider>

                        <Tooltip
                            title={`Następna ranga za ${displayTime(s!.rank.maxValue - sumTime)}`}
                            placement='bottom-start'
                            sx={{ cursor: "help" }}
                        >
                            <Typography variant='body1' fontWeight={"bold"} mt={2}>
                                Główna: {s?.rank.name}
                            </Typography>
                        </Tooltip>
                        <Tooltip
                            title={`Następna poboczna ranga za ${displayTime(
                                s!.subRank.maxValue - sumTime,
                            )}`}
                            placement='bottom-start'
                            sx={{ cursor: "help" }}
                        >
                            <Typography variant='body1' fontWeight={"bold"} mt={1} mb={3}>
                                Poboczna: {s?.subRank.name}
                            </Typography>
                        </Tooltip>
                        <Avatar
                            sx={{ width: "20vh", height: "20vh" }}
                            alt='Remy Sharp'
                            src={`public/images/ranks/${s?.rank.N}.png`}
                            variant='rounded'
                        />
                    </Unstable_Grid2>

                    <Unstable_Grid2 xs={12} xl={8}>
                        <Divider>
                            <Typography variant='h5' fontWeight={"bold"} textAlign='center'>
                                Aktywności
                            </Typography>
                        </Divider>
                        <Box mt={2} mx={2}>
                            <ActivityTable />
                            <Button
                                variant='outlined'
                                size='small'
                                onClick={getAllActivies}
                                sx={{ mt: -10, ml: 3 }}
                            >
                                Pobierz wszystkie aktywności
                            </Button>
                        </Box>
                    </Unstable_Grid2>
                </Unstable_Grid2>
            </Stack>
        </Container>
    );
}

export default Statistics;
