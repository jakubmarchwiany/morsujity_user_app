import AcUnitIcon from "@mui/icons-material/AcUnit";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import { List, ListItem, ListItemButton, ListItemIcon, Stack, Switch } from "@mui/material";
import GuestButtonList from "Components/Main/GuestButtonList";
import UserButtonList from "Components/User/UserButtonList";
import { useAppDispatch, useAppSelector } from "hooks";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserThunk } from "Store/user-actions";
import { DarkMode, LightMode } from "@mui/icons-material";
import { appActions } from "Store/app-slice";

function Navbar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector((state) => state.user);
    const mode = useAppSelector((state) => state.app.mode);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        dispatch(logoutUserThunk(user.token!, navigate));
        window.localStorage.setItem("logout", Date.now().toString());
    };

    // useEffect(() => {
    //     if (window.innerWidth < 1200) {
    //         console.log(window.innerWidth);
    //     }
    // }, []);

    return (
        <AppBar
            elevation={0}
            position="static"
            sx={{ top: "auto", bottom: 0, textAlign: "center", bgcolor: "primary.main" }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "64px" }}>
                <Stack direction="row">
                    <AcUnitIcon
                        fontSize="large"
                        sx={{ display: { xs: "none", lg: "flex" }, ml: 3, mr: 2 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={user.logIn ? user.type + "/dashboard" : "/"}
                        sx={{
                            mr: 2,

                            display: { xs: "none", lg: "flex" },
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

                <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
                    <Tooltip title="Nawigator">
                        <IconButton
                            id="demo-positioned-button"
                            aria-expanded={open ? "true" : undefined}
                            aria-controls={open ? "demo-positioned-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
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
                        <List sx={{ minWidth: "300px" }}>
                            {user.logIn ? (
                                <UserButtonList
                                    logIn={user.logIn}
                                    type={user.type!}
                                    userImage={user.image!}
                                    close={handleClose}
                                    logoutHandler={logoutHandler}
                                />
                            ) : (
                                <GuestButtonList logIn={user.logIn} close={handleClose} />
                            )}
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {mode === "dark" ? (
                                            <DarkMode fontSize="large" />
                                        ) : (
                                            <LightMode fontSize="large" />
                                        )}
                                    </ListItemIcon>
                                    <Switch onChange={() => dispatch(appActions.switchMode())} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Menu>
                </Box>

                <Stack direction="row" p={0} m={0}>
                    <AcUnitIcon
                        sx={{ display: { xs: "flex", lg: "none" }, mr: 1, alignSelf: "center" }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to={user.logIn ? user.type + "/dashboard" : "/"}
                        sx={{
                            display: { xs: "flex", lg: "none" },
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

                <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }} />
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
