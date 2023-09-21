import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import relativeTime from "dayjs/plugin/relativeTime"; // import plugin

dayjs.extend(relativeTime);
dayjs.locale("pl");

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    borderRadius: 25
}));

export function DashBoard(): JSX.Element {
    return (
        <Container
            component="main"
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 20 }
            }}
        >
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <Item>
                        <Typography variant="h5" mb={3}>
                            Ostatnie aktywności
                        </Typography>
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
