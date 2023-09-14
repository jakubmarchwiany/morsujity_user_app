import { Container, Unstable_Grid2 as Grid2, Stack, Typography } from "@mui/material";
import { ImageOptions } from "./ImageOptions";
import { UpdatePassword } from "./UpdatePassword";
import { UpdatePseudonym } from "./UpdatePseudonym";

export function Settings() {
    return (
        <Container component='main' sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 1, md: 5 }} alignItems='center'>
                <Typography variant='h5'>Konto</Typography>
                <Typography variant='h3'>Ustawienia</Typography>
                <Grid2 container>
                    <Grid2 xs={12} xl={6}>
                        <UpdatePseudonym />

                        <UpdatePassword />
                    </Grid2>
                    <Grid2 xs={12} xl={6}>
                       
                        <ImageOptions />
                    </Grid2>
                </Grid2>
            </Stack>
        </Container>
    );
}
