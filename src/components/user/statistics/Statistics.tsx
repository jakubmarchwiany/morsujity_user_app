import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ActivitiesTable } from "components/user/statistics/ActivitiesTable";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getAllActivity } from "store/statistics/activity.actions";
import { RankPanel } from "./RankPanel";
import { TotalActivitiesTimePanel } from "./TotalActivitiesTimePanel";

export function Statistics(): JSX.Element | null {
    const { rank, subRank, activities, totalActivitiesTime } = useAppSelector(
        (state) => state.statistics
    );
    const dispatch = useAppDispatch();

    const getAllActivies = (): void => {
        dispatch(getAllActivity());
    };

    if (
        rank !== undefined &&
        subRank !== undefined &&
        totalActivitiesTime !== undefined &&
        activities !== undefined
    ) {
        return (
            <Container component="main" id="essa1" maxWidth={false} disableGutters>
                <Stack mt={{ xs: 2, md: 3 }}>
                    <Divider>
                        <Typography variant="h3" fontWeight={"bold"} textAlign="center">
                            Statystyki
                        </Typography>
                    </Divider>

                    <Grid2 container mt={3}>
                        <Grid2 xs={12} md={4}>
                            <TotalActivitiesTimePanel totalActivitiesTime={totalActivitiesTime} />

                            <RankPanel
                                rank={rank}
                                subRank={subRank}
                                totalActivitiesTime={totalActivitiesTime}
                            />
                        </Grid2>

                        <Grid2 xs={12} md={8}>
                            <Divider>
                                <Typography variant="h5" fontWeight={"bold"} textAlign="center">
                                    Aktywności
                                </Typography>
                            </Divider>
                            <Box>
                                <ActivitiesTable activities={activities} />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={getAllActivies}
                                    fullWidth
                                    // sx={{ mt: -10, ml: 3 }}
                                >
                                    Pobierz wszystkie aktywności
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Stack>
            </Container>
        );
    } else {
        return null;
    }
}
