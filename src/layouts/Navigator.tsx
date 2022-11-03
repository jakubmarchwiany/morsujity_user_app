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

const PREFIX = "/user";

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
                to={`${PREFIX}/dashboard`}
                isActive={location.pathname === `${PREFIX}/dashboard`}
                Icon={Dashboard}
                closeMenu={closeMenu}
            />
            <MyLinkButton
                text='Dodaj Aktywność'
                to={`${PREFIX}/new-activity`}
                isActive={location.pathname === `${PREFIX}/new-activity`}
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
                        to={`${PREFIX}/group/1`}
                        isActive={location.pathname === `${PREFIX}/group/1`}
                        size='small'
                        Icon={Group}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Chełmskie Morsy'
                        to={`${PREFIX}/group/2`}
                        isActive={location.pathname === `${PREFIX}/group/2`}
                        size='small'
                        Icon={Group}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Szukaj Grupy'
                        to={`${PREFIX}/search`}
                        isActive={location.pathname === `${PREFIX}/search`}
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
                        to={`${PREFIX}/post/1`}
                        isActive={location.pathname === `${PREFIX}/post/1`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='+ / - Morsowania'
                        to={`${PREFIX}/post/2`}
                        isActive={location.pathname === `${PREFIX}/post/2`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                    <MyLinkButton
                        text='Morsowanie ?'
                        to={`${PREFIX}/post/3`}
                        isActive={location.pathname === `${PREFIX}/post/3`}
                        size='small'
                        Icon={Info}
                        closeMenu={closeMenu}
                    />
                </Stack>
            </Collapse>
            <MyLinkButton
                text='Sklep'
                to={`${PREFIX}/shop`}
                isActive={true}
                Icon={Storefront}
                closeMenu={close}
            />
            <Link to={`${PREFIX}/account`} style={{ textDecoration: "none" }}>
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
                    disabled={location.pathname === `${PREFIX}/account`}
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
                to={`${PREFIX}/settings`}
                isActive={location.pathname === `${PREFIX}/settings`}
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
