import AcUnitIcon from "@mui/icons-material/AcUnit";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "hooks/redux";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Navigator from "./Navigator";

function Navbar() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const logIn = useAppSelector((state) => state.user.logIn);
    const type = useAppSelector((state) => state.user.type);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            elevation={0}
            position='static'
            sx={{ top: "auto", bottom: 0, textAlign: "center", bgcolor: "primary.main" }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
                <Stack direction='row'>
                    <AcUnitIcon
                        fontSize='large'
                        sx={{ display: { xs: "none", md: "flex" }, ml: 3, mr: 2 }}
                    />
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to={logIn ? type! + "/dashboard" : "/"}
                        sx={{
                            mr: 2,

                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".15rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Morsujity
                    </Typography>
                </Stack>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <Tooltip title='Nawigator'>
                        <IconButton
                            id='demo-positioned-button'
                            aria-expanded={open ? "true" : undefined}
                            aria-controls={open ? "demo-positioned-menu" : undefined}
                            aria-haspopup='true'
                            onClick={handleClick}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id='demo-positioned-menu'
                        aria-labelledby='demo-positioned-button'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                    >
                        <Navigator onClose={handleClose} navbar={true} />
                    </Menu>
                </Box>

                <Stack direction='row' p={0} m={0}>
                    <AcUnitIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1, alignSelf: "center" }}
                    />
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to={logIn ? type! + "/dashboard" : "/"}
                        sx={{
                            display: { xs: "flex", md: "none" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".15rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Morsujity
                    </Typography>
                </Stack>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
            </Toolbar>
        </AppBar>
    );
}
export default memo(Navbar);
