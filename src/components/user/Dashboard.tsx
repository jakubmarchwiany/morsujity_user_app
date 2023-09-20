import { Container, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { displayTime } from "components/user/statistics/display";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin
import { useAppSelector } from "hooks/redux";


dayjs.extend(relativeTime);
dayjs.locale("pl");

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    borderRadius: 25,
}));

export function DashBoard() {
    const statisics = useAppSelector((state) => state.statistics);

    const generateLastActivities = () => {
        let newArray = [...statisics.activities!];
        return newArray
            .sort(function (a, b) {
                const dateA = new Date(a.date!);
                const dateB = new Date(b.date!);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 3)
            .map((activity) => {
                return (
                    <Stack
                        direction='row'
                        p={1}
                        boxShadow={5}
                        mt={1}
                        justifyContent='space-between'
                        borderRadius={2}
                        key={activity._id}
                    >
                        <Typography>{activity.type ? "mors" : "zimny prysznic"}</Typography>
                        <Typography>{displayTime(activity.duration)}</Typography>
                        <Typography>{dayjs(activity.date).from(dayjs())}</Typography>
                    </Stack>
                );
            });
    };

    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 20 },
            }}
        >
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Item>
                        <Typography variant='h5' mb={3}>
                            Ostatnie aktywności
                        </Typography>
                        {statisics.activities!.length === 0 ? (
                            <Typography>Brak akywności, na co czekasz :)</Typography>
                        ) : (
                            generateLastActivities()
                        )}
                    </Item>
                </Grid>
                <Grid xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        </Container>
    );
}
