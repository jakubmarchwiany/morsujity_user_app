import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as NavLink } from "react-router-dom";


const inputStyle = { WebkitBoxShadow: "0 0 0 1000px #e4f5fe inset" };

export default function Login() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ mb: 4, bgcolor: "primary.600",width: "70px",height: "70px" }}>
                    <LockOpenOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Zaloguj się
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        name="email"
                        id="email"
                        autoComplete="email"
                        label="Adres email"
                        fullWidth
                        margin="normal"
                        inputProps={{ style: inputStyle }}
                        required
                        autoFocus
                    />

                    <TextField
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        label="Hasło"
                        fullWidth
                        margin="normal"
                        inputProps={{ style: inputStyle }}
                        required
                    />

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Pamiętaj mnie"
                    /> */}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                        Zaloguj
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link component={NavLink} to="/register" variant="body2">
                            Nie masz konta?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
