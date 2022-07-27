import AcUnitIcon from "@mui/icons-material/AcUnit";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";

import { Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "Store/user-actions";

const pages = ["Blog"];
const UserSettings = [
    { name: "Konto", id: "account" },
    { name: "Wyloguj", id: "logout" },
];
const settings = [
    { name: "Rejestracja", to: "register" },
    { name: "Logowanie", to: "login" },
];

function Navbar() {
    // const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector((state) => state.user.token);
    const isUserLogin = useAppSelector((state) => state.user.account);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        const id = event.currentTarget.id;
        if (id === "logout") logoutHandler();

        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        dispatch(logoutUserThunk(token!, navigate));
    };

    const syncLogout = useCallback(
        (event: any) => {
            if (event.key === "logout") {
                // If using react-router-dom, you may call history.push("/")
                navigate("/", { replace: true });
                window.location.reload();
            }
        },
        [navigate]
    );

    useEffect(() => {
        window.addEventListener("storage", syncLogout);
        return () => {
            window.removeEventListener("storage", syncLogout);
        };
    }, [syncLogout]);

    return (
        <AppBar
            elevation={0}
            position="static"
            sx={{ top: "auto", bottom: 0, textAlign: "center" }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack direction="row">
                    <AcUnitIcon
                        fontSize="large"
                        sx={{ display: { xs: "none", md: "flex" }, ml: 3, mr: 2 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            pt: 0.3,
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
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {isUserLogin
                            ? pages.map((page) => (
                                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                                      <Typography textAlign="center">{page}</Typography>
                                  </MenuItem>
                              ))
                            : settings.map((page) => (
                                  <MenuItem
                                      style={{ margin: "0px" }}
                                      key={page.name}
                                      component={Link}
                                      to={`/${page.to}`}
                                      onClick={handleCloseNavMenu}
                                  >
                                      {page.name}
                                  </MenuItem>
                              ))}
                    </Menu>
                </Box>

                <AcUnitIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                        mr: 2,
                        flexGrow: 1,
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

                {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ mt: 0.5, color: "white", display: "block" }}
                        >
                            {page}
                        </Button>
                    ))}
                </Box> */}

                {isUserLogin ? (
                    <Box sx={{ flexGrow: 0, mr: { xs: 1, md: 3 } }}>
                        <Tooltip title="Otwórz ustawienia">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {UserSettings.map((setting) => (
                                <MenuItem
                                    id={`${setting.id}`}
                                    key={setting.name}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center" minWidth="100px">
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}>
                        {settings.map((page) => (
                            <Button
                                component={Link}
                                to={`/${page.to}`}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ mt: 0.5, color: "white", display: "block" }}
                            >
                                {page.name}
                                {/* <Link
                                    style={{ textDecoration: "none", color: "white" }}
                                    to={`/${page.to}`}
                                >
                                    {page.name}
                                </Link> */}
                            </Button>
                        ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
