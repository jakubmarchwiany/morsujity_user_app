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
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MyListItem from "components/my/MyListItem";
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
            <MyListItem to='/' close={close} primary='Strona główna' Icon={Web} />
            <MyListItem to='/login' close={close} primary='Logowanie' Icon={Login} />
            <MyListItem to='/register' close={close} primary='Register' Icon={HowToReg} />

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

            <MyListItem to='/search' close={close} primary='Szukaj Grupy' Icon={GroupAdd} />

            <MyListItem
                disabled={true}
                to='/shop'
                close={close}
                primary='Sklep'
                Icon={Storefront}
            />
        </>
    );
}
export default memo(GuestButtonList);
