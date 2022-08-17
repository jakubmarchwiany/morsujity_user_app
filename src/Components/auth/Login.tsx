import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { Avatar, Box, Button, Container, Link, Typography } from "@mui/material";
import ResetPassword from "components/auth/ResetPassword";
import MyTextField from "components/my/MyTextField";
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
                    <MyTextField name="email" label="Adres email" formik={formik} />

                    <MyTextField
                        name="password"
                        type="password"
                        label="Hasło"
                        autoComplete="current-password"
                        formik={formik}
                    />

                    <ResetPassword />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Zaloguj
                    </Button>

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Pamiętaj mnie"
                    /> */}

                    <Link
                        component={NavLink}
                        to="/register"
                        variant="body2"
                        underline="hover"
                        color="text.secondary"
                    >
                        Nie masz konta?
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
export default Login;
