import { Stack, Typography } from "@mui/material";
import MyLinkButton from "components/my/MyLinkButton";

function Footer() {
    return (
        <Stack
            bgcolor='primary.main'
            direction='row'
            alignItems='center'
            px='10%'
            justifyContent='space-between'
        >
            <Typography sx={{ color: "primary.contrastText" }}>
                Morsujity {new Date().getFullYear()}
            </Typography>
            <Stack direction='row'>
                <MyLinkButton
                    text='Statut'
                    to='user/statut'
                    isActive={false}
                    size='small'
                    textColor='primary.contrastText'
                />
                <MyLinkButton
                    text='Kontakt'
                    to='user/contact'
                    isActive={false}
                    size={"small"}
                    textColor='primary.contrastText'
                />
            </Stack>
        </Stack>
    );
}
export default Footer;
