import { Box, Typography } from "@mui/material";

function Ads() {
    return (
        <Box bgcolor="red" flex={2} p={2} sx={{ display: { xs: "none", lg: "block" } }}>
            <Typography variant="h1">Ads</Typography>
        </Box>
    );
}
export default Ads;
