import { Box, Typography, Stack } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

import { myTheme } from "../Assets/theme";

function Footer() {
    return (
        <Stack
            bgcolor={myTheme.palette.primary.main}
            direction="row"
            py={1.5}
            justifyContent="space-around"
        >
            <Box color="white">Strona morsujity 2022</Box>
            <Box>
                <Typography component={NavLink} to="/statut" sx={{ color: "white" }}>
                    Regulamin
                </Typography>
                <Typography component={NavLink} mx={2} to="/contact" sx={{ color: "white" }}>
                    Kontakt
                </Typography>
            </Box>
        </Stack>
    );
}

export default Footer;
