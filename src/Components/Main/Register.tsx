import { Container, Typography, Box, Grid, Link, TextField, Button, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link as NavLink } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    nickname: "",
    pseudonym: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
    nickname: Yup.string()
        .required("Wymagane")
        .min(3, "Co najmniej 3 znaki")
        .max(15, "Maksymalnie 15 znaków"),
    pseudonym: Yup.string()
        .required("Wymagane")
        .min(3, "Ksywka za krótka - Co najmniej 3 znaki")
        .max(15, "Ksywka za długa - Maksymalnie 15 znaków"),
    email: Yup.string().required("Wymagane").email("Email niepoprawny"),
    password: Yup.string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)"),
    confirmPassword: Yup.string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)")
        .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same"),
});

function Register() {
    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: (values) => {
            console.log("submit");
        },
    });

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
                <Avatar sx={{ mb: 4, bgcolor: "primary.600", width: "70px", height: "70px" }}>
                    <LockOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Stwórz konto
                </Typography>

                <Box component={"form"} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="nickname"
                                id="nickname"
                                autoComplete="nickname"
                                label="Nazwa użytkownika"
                                fullWidth
                                autoFocus
                                value={formik.values.nickname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                                helperText={formik.touched.nickname && formik.errors.nickname}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="pseudonym"
                                id="pseudonym"
                                label="Ksywka (pseudonim, Imię i Nazwisko)"
                                fullWidth
                                value={formik.values.pseudonym}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.pseudonym && Boolean(formik.errors.pseudonym)}
                                helperText={formik.touched.pseudonym && formik.errors.pseudonym}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                id="email"
                                autoComplete="email"
                                label="Adres email"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
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
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
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
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.confirmPassword &&
                                    Boolean(formik.errors.confirmPassword)
                                }
                                helperText={
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
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
