import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as NavLink } from "react-router-dom";

function Register() {
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
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ mb: 4, bgcolor: "secondary.main", width: "70px", height: "70px" }}>
                    <LockOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Stwórz konto
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="nickname"
                                id="nickname"
                                autoComplete="nickname"
                                label="Nazwa użytkownika"
                                fullWidth
                                required
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="pseudonym"
                                id="pseudonym"
                                label="Ksywka (pseudonim, Imię i Nazwisko)"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                id="email"
                                autoComplete="email"
                                label="Adres email"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="new-password"
                                label="Hasło"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="new-password"
                                label="Potwierdzenie Hasła"
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Rejestruj
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link component={NavLink} to="/login" variant="body2">
                                Masz już konto?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default Register;
