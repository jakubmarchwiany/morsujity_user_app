import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ResetPassword from "components/auth/ResetPassword";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "store/auth-actions";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    email: "",
    password: "",
};

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Wymagane").email("Email niepoprawny"),
    password: Yup.string().required("Wymagane"),
});

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ email, password }) => {
            dispatch(loginUser(email, password, navigate));
        },
    });

    useEffect(() => {
        formik.validateForm();
        // eslint-disable-next-line
    }, []);

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
                <Avatar
                    sx={{
                        mb: 4,
                        bgcolor: "primary.main",
                        width: "70px",
                        height: "70px",
                        color: "white",
                    }}
                >
                    <LockOpenOutlinedIcon fontSize="large" />
                </Avatar>

                <Typography component="h1" variant="h4">
                    Zaloguj się
                </Typography>
                <Box component={"form"} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        name="email"
                        id="email"
                        autoComplete="email"
                        label="Adres email"
                        margin="normal"
                        fullWidth
                        color="secondary"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />

                    <TextField
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        label="Hasło"
                        fullWidth
                        color="secondary"
                        margin="normal"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <ResetPassword />

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Pamiętaj mnie"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Zaloguj
                    </Button>
                    <Grid container justifyContent="flex-start">
                        <Grid item>
                            <Link
                                component={NavLink}
                                to="/register"
                                variant="body2"
                                underline="hover"
                                color="text.color"
                            >
                                Nie masz konta?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
export default Login;
