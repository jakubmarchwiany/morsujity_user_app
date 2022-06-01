import { Box, Link, Stack } from "@mui/material";

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
                <Link href="#" sx={{ color: "white" }}>
                    Regulamin
                </Link>
                <Link mx={2} href="#" sx={{ color: "white" }}>
                    Kontakt
                </Link>
            </Box>
        </Stack>
    );
}

export default Footer;
