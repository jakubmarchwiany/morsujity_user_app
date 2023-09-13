import { DarkMode, LightMode } from "@mui/icons-material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Stack, Theme, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigator } from "./Navigator";

interface NavbarProps {
    switchMode: () => void;
}

export function Navbar({ switchMode }: NavbarProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const theme = useTheme<Theme>();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            elevation={0}
            position='static'
            sx={{
                bgcolor: "primary.main",
                top: "auto",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", alignContent: "center", my: 0 }}>
                <Stack direction='row' alignItems='center'>
                    <AcUnitIcon
                        fontSize='large'
                        sx={{
                            mr: 2,
                            color: "#fff",
                        }}
                    />

                    <Link to='/' style={{ textDecoration: "none" }}>
                        <MuiLink
                            component='p'
                            variant='h6'
                            underline='hover'
                            sx={{
                                color: "#fff",
                            }}
                        >
                            Morsujity
                        </MuiLink>
                    </Link>
                </Stack>
                <Box>
                    <IconButton sx={{ ml: 1, color: "white" }} onClick={switchMode}>
                        {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
                    </IconButton>
                    {isSmallScreen && (
                        <>
                            <Tooltip title='Nawigator'>
                                <IconButton
                                    id='demo-positioned-button'
                                    aria-expanded={open ? "true" : undefined}
                                    aria-controls={open ? "demo-positioned-menu" : undefined}
                                    aria-haspopup='true'
                                    onClick={handleClick}
                                    sx={{ color: "white" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id='demo-positioned-menu'
                                aria-labelledby='demo-positioned-button'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseMenu}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                            >
                                <Navigator closeMenu={handleCloseMenu} />
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
