import { Box, Typography } from "@mui/material";

function Home() {
    return (
        <Box mb={30} textAlign="center">
            <Typography variant="h1">Morsuj i Ty</Typography>
            <Typography mt={10} mb={5} variant="h5">
                Strona użytkownika
            </Typography>
        </Box>
    );
}

export default Home;
