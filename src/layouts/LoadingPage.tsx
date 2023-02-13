import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, Link, Stack, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { postFetch } from "utils/fetches";
import { sleeper } from "utils/useful";
import * as Yup from "yup";

const { VITE_DOMAIN_URL: DOMAIN_URL } = import.meta.env;

const LOGIN_FORM_STATE = {
    email: "",
    password: "",
};

const LOGIN_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Wymagane").email("Niepoprawny adres email"),
    password: Yup.string().required("Wymagane"),
});

type Props = {
    isLogged: boolean | undefined;
};

function LoadingPage({ isLogged }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const formikLogin = useFormik({
        initialValues: LOGIN_FORM_STATE,
        validationSchema: LOGIN_VALIDATION,
        onSubmit: ({ email, password }, { resetForm }) => {
            setIsLoading(true);
            postFetch<{ message: string; token: string }>({ email, password }, `/auth/login`, {
                customError: true,
            })
                .then(async ({ token }) => {
                    Cookies.set("authorization", token, {
                        expires: 7,
                        path: "/",
                    });
                    await sleeper(2);
                    window.location.reload();
                })
                .catch(() => {
                    setIsLoading(false);
                });
        },
    });

    return (
        <Container
            component='main'
            maxWidth={false}
            sx={{
                backgroundColor: "#424242",
                height: "100vh",
                pt: "5%",
                px: { xs: "10%", sm: "20%", md: "30%", lg: "35%", xl: "40%" },
            }}
        >
            {isLogged === false && (
                <Stack alignItems={"center"} m={0}>
                    <Avatar
                        sx={{
                            mb: 2,
                            bgcolor: "primary.main",
                            width: "70px",
                            height: "70px",
                            color: "white",
                        }}
                    >
                        <LockOpenOutlinedIcon fontSize='large' />
                    </Avatar>

                    <Typography component='h1' variant='h4' color='white'>
                        Zaloguj się
                    </Typography>
                    <Box component={"form"} noValidate onSubmit={formikLogin.handleSubmit}>
                        <MyTextField
                            name='email'
                            label='Email'
                            sx={{ input: { color: "white" } }}
                            formik={formikLogin}
                        />
                        <MyTextField
                            name='password'
                            label='Hasło'
                            type='password'
                            margin='dense'
                            sx={{ mb: 2, input: { color: "white" } }}
                            formik={formikLogin}
                        />

                        <Link href={DOMAIN_URL + "/auth/reset-password"} target='_blank'>
                            Nie pamiętasz hasła?
                        </Link>

                        <LoadingButton
                            loading={isLoading}
                            type='submit'
                            variant='contained'
                            disabled={!(formikLogin.isValid && formikLogin.dirty)}
                            fullWidth
                            sx={{ my: 1 }}
                        >
                            Zaloguj
                        </LoadingButton>

                        <Link href={DOMAIN_URL + "/register"} target='_blank'>
                            Nie masz konta?
                        </Link>
                    </Box>
                </Stack>
            )}
        </Container>
    );
}
export default LoadingPage;
