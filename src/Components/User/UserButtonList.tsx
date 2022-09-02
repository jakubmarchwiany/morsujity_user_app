import {
    AddTask,
    Dashboard,
    ExpandLess,
    ExpandMore,
    Group,
    GroupAdd,
    Groups,
    Logout,
    Settings,
    Storefront,
} from "@mui/icons-material";
import {
    Avatar,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MyListItem from "components/my/MyListItem";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    logIn: boolean;
    type: string;
    userImage: string;
    logoutHandler: () => void;
    close?: () => void;
}

function UserButtonList({ type, userImage, logoutHandler, close }: Props) {
    const [open, setOpen] = useState(true);

    return (
        <>
            <MyListItem
                to={`${type}/dashboard`}
                close={close}
                primary='Panel Główny'
                Icon={Dashboard}
            />
            <MyListItem
                to={`${type}/new-activity`}
                close={close}
                primary='Dodaj Aktywność'
                Icon={AddTask}
            />

            <ListItemButton
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <ListItemIcon>
                    <Groups fontSize='large' />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{ letterSpacing: 1.5 }}
                    primary='Twoje Grupy'
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding onClick={close}>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <Group fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ letterSpacing: 1.5 }}
                            primary='Hipotermia'
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <Group fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ letterSpacing: 1.5 }}
                            primary='Chełmskie Morsy'
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='#simple-list'>
                        <ListItemIcon>
                            <GroupAdd fontSize='large' />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ letterSpacing: 1.5 }}
                            primary='Szukaj Grupy'
                        />
                    </ListItemButton>
                </List>
            </Collapse>

            <MyListItem
                disabled={true}
                to={`${type}/shop`}
                close={close}
                primary='Sklep'
                Icon={Storefront}
            />

            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to={`${type}/account`}>
                    <ListItemIcon>
                        <Avatar
                            sx={{ width: 35, height: 35 }}
                            alt='Remy Sharp'
                            src={userImage}
                            variant='rounded'
                        />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ letterSpacing: 1.5 }} primary='Konto' />
                </ListItemButton>
            </ListItem>

            <MyListItem
                to={`${type}/settings`}
                close={close}
                primary='Ustawienia'
                Icon={Settings}
            />

            <MyListItem to='/' close={logoutHandler} primary='Wyloguj' Icon={Logout} />
        </>
    );
}
export default UserButtonList;
