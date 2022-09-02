import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Link } from "react-router-dom";

type Props = {
    to: string;
    primary: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    close?: () => void;
    disabled?: boolean;
};

function MyListItem({ to, primary, Icon, close, disabled }: Props) {
    return (
        <ListItem disablePadding onClick={close}>
            <ListItemButton component={Link} to={to} disabled={disabled ? disabled : false}>
                <ListItemIcon>
                    <Icon fontSize='large' />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ letterSpacing: 1.5 }} primary={primary} />
            </ListItemButton>
        </ListItem>
    );
}

export default MyListItem;
