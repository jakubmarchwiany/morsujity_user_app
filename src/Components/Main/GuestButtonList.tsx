import {
    Book,
    ExpandLess,
    ExpandMore,
    GroupAdd,
    HowToReg,
    Info,
    Login,
    Storefront,
    Web,
} from "@mui/icons-material";
import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { memo, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
    logIn: boolean;
    close?: () => void;
}

function GuestButtonList({ close }: Props) {
    const [open, setOpen] = useState(true);

    return (
        <>
            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to='/'>
                    <ListItemIcon>
                        <Web fontSize='large' />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ letterSpacing: 1.5 }}
                        primary='Strona główna'
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to='/login'>
                    <ListItemIcon>
                        <Login fontSize='large' />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ letterSpacing: 1.5 }}
                        primary='Logowanie'
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to='/register'>
                    <ListItemIcon>
                        <HowToReg fontSize='large' />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ letterSpacing: 1.5 }}
                        primary='Rejestracja'
                    />
                </ListItemButton>
            </ListItem>
            <ListItemButton
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <ListItemIcon>
                    <Book fontSize='large' />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ letterSpacing: 1.5 }} primary='Blog' />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding onClick={close}>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/blog'>
                        <ListItemIcon style={{ minWidth: "40px" }}>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary='O Aplikacja' />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/blog'>
                        <ListItemIcon style={{ minWidth: "40px" }}>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary='Morsowanie ?' />
                    </ListItemButton>

                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/blog'>
                        <ListItemIcon style={{ minWidth: "40px" }}>
                            <Info />
                        </ListItemIcon>
                        <ListItemText primary='+ / - Morsowania' />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to='/search'>
                    <ListItemIcon>
                        <GroupAdd fontSize='large' />
                    </ListItemIcon>
                    <ListItemText
                        primaryTypographyProps={{ letterSpacing: 1.5 }}
                        primary='Szukaj Grupy'
                    />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={close}>
                <ListItemButton component={Link} to='/shop' disabled>
                    <ListItemIcon>
                        <Storefront fontSize='large' />
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{ letterSpacing: 1.5 }} primary='Sklep' />
                </ListItemButton>
            </ListItem>
        </>
    );
}
export default memo(GuestButtonList);
