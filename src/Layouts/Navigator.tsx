import { DarkMode, LightMode } from "@mui/icons-material";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Switch,
    Theme,
    useMediaQuery,
    useTheme
} from "@mui/material";
import GuestButtonList from "components/main/GuestButtonList";
import UserButtonList from "components/user/UserButtonList";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { appActions } from "store/app-slice";
import { logoutUser } from "store/auth-actions";
import { getUserData } from "store/user-actions";

interface NavigatorProps {
    navbar: boolean;
    onClose?: () => void;
}

const Navigator = (props: NavigatorProps) => {
    const user = useAppSelector((state) => state.user);
    const mode = useAppSelector((state) => state.app.mode);

    const theme = useTheme<Theme>();
    let bigScreen = useMediaQuery(theme.breakpoints.up("md"));

    if (props.navbar) {
        bigScreen = !bigScreen;
    }

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.logIn && Cookies.get("Authorization")) {
            console.log("siema");
            dispatch(getUserData(navigate));
        }
        // eslint-disable-next-line
    }, []);

    const logoutHandler = () => {
        dispatch(logoutUser(navigate));
        window.localStorage.setItem("logout", Date.now().toString());
    };

    return bigScreen ? (
        <List>
            {user.logIn ? (
                <UserButtonList
                    logIn={user.logIn}
                    type={user.type!}
                    userImage={user.image!}
                    close={props.onClose}
                    logoutHandler={logoutHandler}
                />
            ) : (
                <GuestButtonList logIn={user.logIn} close={props.onClose} />
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
                    <Switch
                        checked={mode === "dark" ? true : false}
                        onChange={() => dispatch(appActions.switchMode())}
                    />
                </ListItemButton>
            </ListItem>
        </List>
    ) : (
        <></>
    );
};
export default Navigator;
