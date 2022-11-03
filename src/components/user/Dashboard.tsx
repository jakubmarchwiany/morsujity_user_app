import { Box, Container, Typography } from "@mui/material";

function DashBoard() {
    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 30 },
            }}
        >
            <Box textAlign='center'>
                <Typography variant='h1'>Morsuj i Ty</Typography>
                <Typography mt={10} mb={5} variant='h5'>
                    Strona użytkownika
                </Typography>
            </Box>
        </Container>
    );
}
export default DashBoard;
