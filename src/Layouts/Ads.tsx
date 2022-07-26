import { Box } from "@mui/material";
import React from "react";

function Ads() {
    // return (
    //     <Box flex={2} p={2} sx={{ display: { xs: "none", md: "block" } }}>
    //         {/* <script
    //             async
    //             src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2882072498226605"
    //             crossOrigin="anonymous"
    //         ></script>

    //         <ins
    //             className="adsbygoogle"
    //             style={{ display: "block" }}
    //             data-ad-client="ca-pub-2882072498226605"
    //             data-ad-slot="7324634635"
    //             data-ad-format="auto"
    //             data-full-width-responsive="true"
    //         ></ins>
    //         <script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
    //     </Box>
    // );

    return <Box bgcolor="red" flex={2} p={2} sx={{display: {xs: "none", md: "block"}}}>Ads</Box>;
}

export default Ads;
