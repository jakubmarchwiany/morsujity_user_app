import { Container, Unstable_Grid2 as Grid2, Stack, Typography } from "@mui/material";
import { UpdateImage } from "./UpdateImage";
import { UpdatePassword } from "./UpdatePassword";
import { UpdatePseudonym } from "./UpdatePseudonym";

export function Settings(): JSX.Element {
    return (
        <Container component="main" sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 2, md: 3 }} alignItems="center">
                <Typography variant="h4">Konto</Typography>
                <Typography variant="h2">Ustawienia</Typography>
                <Grid2 container mt={3} spacing={2}>
                    <Grid2 xs={12} xl={6}>
                        <UpdatePseudonym />

                        <UpdatePassword />
                    </Grid2>
                    <Grid2 xs={12} xl={6}>
                        <UpdateImage />
                    </Grid2>
                </Grid2>
            </Stack>
        </Container>
    );
}
