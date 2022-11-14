import {
    AddTask,
    Book,
    Dashboard,
    ExpandLess,
    ExpandMore,
    Group,
    GroupAdd,
    Groups,
    Info,
    Logout,
    Settings,
    Storefront,
} from "@mui/icons-material";
import { Avatar, Button, Collapse, Stack } from "@mui/material";
import MyLinkButton from "components/my/MyLinkButton";
import { useAppSelector } from "hooks/redux";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "store/user-actions";

interface NavigatorProps {
    closeMenu?: () => void;
}

const Navigator = ({ closeMenu }: NavigatorProps) => {
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const [isGroupsOpen, setIsGroupsOpen] = useState(true);

    const userImage = useAppSelector((state) => state.user.image);
    const location = useLocation();

    const logoutHandler = () => {
        logoutUser();
        window.localStorage.setItem("logout", Date.now().toString());
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
                to={`/new-activity`}
                isActive={location.pathname === `/new-activity`}
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
                        text='Szukaj Grupy'
                        to={`/search`}
                        isActive={location.pathname === `/search`}
                        size='small'
                        Icon={GroupAdd}
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
            <Link to={`/account`} style={{ textDecoration: "none" }}>
                <Button
                    size='large'
                    startIcon={
                        <Avatar
                            sx={{ width: 22, height: 22 }}
                            alt='Remy Sharp'
                            src={userImage}
                            variant='rounded'
                        />
                    }
                    disabled={location.pathname === `/account`}
                    sx={{
                        color: "secondary.contrastText",
                    }}
                    fullWidth
                    onClick={closeMenu}
                >
                    Konto
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
};
export default Navigator;
