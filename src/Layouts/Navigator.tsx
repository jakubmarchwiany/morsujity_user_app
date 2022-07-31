import {
    AccountBox,
    Article,
    Group,
    Home,
    ModeNight,
    Person,
    Settings,
    Storefront,
    AddTask,
    Logout,
    Groups,
    ExpandLess,
    ExpandMore,
    GroupAdd,
} from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
} from "@mui/material";
import { useState } from "react";

const Navigator = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box flex={2} sx={{ display: { xs: "none", md: "block" } }}>
            <Box px={2} pt={2} width={"100%"}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#home">
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Strona Główna"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#home">
                            <ListItemIcon>
                                <AddTask />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Dodaj Aktywność"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <Groups />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ letterSpacing: 1.5 }}
                            primary="Twoje Grupy"
                        />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{ letterSpacing: 1.5 }}
                                    primary="Hipotermia"
                                />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{ letterSpacing: 1.5 }}
                                    primary="Chełmskie Morsy"
                                />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} component="a" href="#simple-list">
                                <ListItemIcon>
                                    <GroupAdd />
                                </ListItemIcon>
                                <ListItemText
                                    primaryTypographyProps={{ letterSpacing: 1.5 }}
                                    primary="Szukaj Grupy"
                                />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list" disabled>
                            <ListItemIcon>
                                <Storefront />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Sklep"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <AccountBox />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Konto"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Ustawienia"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{ letterSpacing: 1.5 }}
                                primary="Wyloguj"
                            />
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding>
                        <ListItemButton component="a" href="#simple-list">
                            <ListItemIcon>
                                <ModeNight />
                            </ListItemIcon>
                            <Switch
                            // onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
                            />
                        </ListItemButton>
                    </ListItem> */}
                </List>
            </Box>
        </Box>
    );
};

export default Navigator;
