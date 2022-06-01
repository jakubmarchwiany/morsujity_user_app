import { Box, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";

function Welcome() {
    return (
        <Box mb={30} textAlign="center">
            <Typography variant="h1">Morsuj i Ty</Typography>
            <Typography mt={10} mb={5} variant="h5">
                Witamj w Morsujity! <br />
                Morsuj dołączaj do grup. <br />
                Zdobywaj kolejne rangi!
            </Typography>
            <Button component={Link} variant="contained" to={"/search"}>
                Szukaj grup
            </Button>
        </Box>
    );
}

export default Welcome;
