import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, Switch } from "@mui/material";
import GuestButtonList from "Components/Main/GuestButtonList";
import UserButtonList from "Components/User/UserButtonList";
import { useAppDispatch, useAppSelector } from "hooks";
import { useNavigate } from "react-router-dom";
import { appActions } from "Store/app-slice";
import { logoutUserThunk } from "Store/user-actions";

const Navigator = () => {
    const user = useAppSelector((state) => state.user);
    const mode = useAppSelector((state) => state.app.mode);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUserThunk(user.token!, navigate));
        window.localStorage.setItem("logout", Date.now().toString());
    };

    return (
        <Box
            flex={2}
            sx={{ display: { xs: "none", lg: "block" } }}
            bgcolor={"background.default"}
            color={"text.primary"}
        >
            <List sx={{ mt: 3 }}>
                {user.logIn ? (
                    <UserButtonList
                        logIn={user.logIn}
                        type={user.type!}
                        userImage={user.image!}
                        logoutHandler={logoutHandler}
                    />
                ) : (
                    <GuestButtonList logIn={user.logIn} />
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
        </Box>
    );
};

export default Navigator;
