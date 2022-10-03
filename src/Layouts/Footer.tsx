import { Box, Stack, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

function Footer() {
    return (
        <Stack bgcolor={"primary.main"} direction='row' justifyContent='space-around' py={1}>
            <Typography sx={{ color: "white" }}>Strona morsujity 2022</Typography>
            <Box>
                <Typography
                    component={NavLink}
                    to='/statut'
                    sx={{ color: "white" }}
                    justifyContent={"center"}
                >
                    Regulamin
                </Typography>
                <Typography component={NavLink} mx={2} to='/contact' sx={{ color: "white" }}>
                    Kontakt
                </Typography>
            </Box>
        </Stack>
    );
}
export default Footer;
