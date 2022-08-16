import { Box, Typography } from "@mui/material";

function Welcome() {
    return (
        <Box mt={15} textAlign="center">
            <Typography variant="h1">Morsuj i Ty</Typography>
            <Typography mt={10} mb={5} variant="h5">
                Witamj w Morsujity! <br />
                Morsuj dołączaj do grup. <br />
                Zdobywaj kolejne rangi!
            </Typography>
        </Box>
    );
}
export default Welcome;
