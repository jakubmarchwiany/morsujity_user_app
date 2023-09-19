import {
    AddTask,
    Book,
    Create,
    Dashboard,
    ExpandLess,
    ExpandMore,
    Group,
    Groups,
    Info,
    Logout,
    Search,
    Settings,
    Storefront
} from "@mui/icons-material";
import { Avatar, Button, Collapse, Stack } from "@mui/material";
import { MyLinkButton } from "components/my/MyLinkButton";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "store/user/auth.actions";

interface NavigatorProps {
    closeMenu?: () => void;
}

export function Navigator({ closeMenu }: NavigatorProps) {
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(true);

    const imageUrl = useAppSelector((state) => state.user.imageUrl);
    const location = useLocation();

    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logout);

        if (closeMenu != undefined) closeMenu();
    };

    return (
        <Stack>
            <MyLinkButton
                text='Panel główny'
                to={`/`}
                isActive={location.pathname === `/`}
                Icon={Dashboard}
                closeMenu={closeMenu}
            />
            <MyLinkButton
                text='Dodaj Aktywność'
                to={`/create-activity`}
                isActive={location.pathname === `/create-activity`}
                Icon={AddTask}
                closeMenu={closeMenu}
            />
            <Button
                size='large'
                startIcon={<Groups fontSize='large' />}
                endIcon={isGroupsOpen ? <ExpandLess /> : <ExpandMore />}
                fullWidth
                sx={{
                    color: "secondary.contrastText",
                }}
                onClick={() => {
                    setIsGroupsOpen(!isGroupsOpen);
                }}
            >
                Twoje Grupy
            </Button>
            <Collapse in={isGroupsOpen} timeout='auto' unmountOnExit>
                <Stack>
                    <MyLinkButton
                        text='Hipotermia'
                        to={`/group/1`}
                        isActive={location.pathname === `/group/1`}
                        size='small'
                        Icon={Group}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Chełmskie Morsy'
                        to={`/group/2`}
                        isActive={location.pathname === `/group/2`}
                        size='small'
                        Icon={Group}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Szukaj'
                        to={`/group/search`}
                        isActive={location.pathname === `/search`}
                        size='small'
                        Icon={Search}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Stwórz'
                        to={`/group/create`}
                        isActive={location.pathname === `/group/create`}
                        size='small'
                        Icon={Create}
                        closeMenu={closeMenu}
                    />
                </Stack>
            </Collapse>
            <Button
                size='large'
                startIcon={<Book fontSize='large' />}
                endIcon={isBlogOpen ? <ExpandLess /> : <ExpandMore />}
                sx={{
                    color: "secondary.contrastText",
                }}
                onClick={() => {
                    setIsBlogOpen(!isBlogOpen);
                }}
            >
                Blog
            </Button>
            <Collapse in={isBlogOpen} timeout='auto' unmountOnExit>
                <Stack pl={2}>
                    <MyLinkButton
                        text='O Aplikacja'
                        to={`/post/1`}
                        isActive={location.pathname === `/post/1`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='+ / - Morsowania'
                        to={`/post/2`}
                        isActive={location.pathname === `/post/2`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Morsowanie ?'
                        to={`/post/3`}
                        isActive={location.pathname === `/post/3`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                </Stack>
            </Collapse>
            <MyLinkButton
                text='Sklep'
                to={`/shop`}
                isActive={true}
                Icon={Storefront}
                closeMenu={close}
            />
            <Link to={`/statistics`} style={{ textDecoration: "none" }}>
                <Button
                    size='large'
                    startIcon={
                        <Avatar
                            sx={{ width: 22, height: 22 }}
                            alt='Remy Sharp'
                            src={imageUrl}
                            variant='rounded'
                        />
                    }
                    disabled={location.pathname === `/statistics`}
                    sx={{
                        color: "secondary.contrastText",
                    }}
                    fullWidth
                    onClick={closeMenu}
                >
                    Statystyki
                </Button>
            </Link>
            <MyLinkButton
                text='Ustawienia'
                to={`/settings`}
                isActive={location.pathname === `/settings`}
                Icon={Settings}
                closeMenu={close}
            />
            <Button
                size='large'
                startIcon={<Logout fontSize='large' />}
                sx={{
                    color: "secondary.contrastText",
                }}
                onClick={() => logoutHandler()}
            >
                Wyloguj
            </Button>
        </Stack>
    );
}
