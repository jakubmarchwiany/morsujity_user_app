import { LockOpenOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Checkbox, FormControlLabel, Link, Stack, Typography } from "@mui/material";
import { standardSize } from "assets/theme";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { postFetch } from "utils/fetches";
import { sleep } from "utils/useful";
import { object, string } from "yup";

const LOGIN_FORM_STATE = {
    email: "",
    password: "",
};

const LOGIN_VALIDATION = object().shape({
    email: string().required("Wymagane").email("Niepoprawny adres email"),
    password: string().required("Wymagane"),
});

const { VITE_DOMAIN_URL: DOMAIN_URL } = import.meta.env;

export function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const formikLogin = useFormik({
        initialValues: LOGIN_FORM_STATE,
        validationSchema: LOGIN_VALIDATION,
        onSubmit: ({ email, password }, { resetForm }) => {
            setIsLoading(true);
            postFetch<{
                message: string;
                data: { expires: number; domain: string; token: string };
            }>({ email, password }, "/auth/login", {
                customError: true,
            })
                .then(async ({ data }) => {
                    const { domain, expires, token } = data;

                    console.log(data);
                    Cookies.set("authorization", token, {
                        expires: rememberMe ? expires / 24 / 60 / 60 : undefined,
                        path: "/",
                        domain: domain,
                    });
                    await sleep(1000);
                    window.location.reload();
                })
                .catch(() => {
                    setIsLoading(false);
                });
        },
    });

    return (
        <Stack alignItems={"center"} width={standardSize}>
            <Avatar
                sx={{
                    bgcolor: "primary.main",
                    width: "5rem",
                    height: "5rem",
                    color: "white",
                }}
            >
                <LockOpenOutlined fontSize='large' />
            </Avatar>

            <Typography variant='h4' color='white' mt={1}>
                Zaloguj się
            </Typography>
            <Box component={"form"} noValidate onSubmit={formikLogin.handleSubmit} mt={2}>
                <MyTextField
                    name='email'
                    label='Email'
                    sx={{
                        input: {
                            color: "white",
                        },
                    }}
                    formik={formikLogin}
                />
                <MyTextField
                    name='password'
                    label='Hasło'
                    type='password'
                    sx={{
                        input: {
                            color: "white",
                        },
                    }}
                    formik={formikLogin}
                />
                <LoadingButton
                    loading={isLoading}
                    type='submit'
                    variant='contained'
                    disabled={!(formikLogin.isValid && formikLogin.dirty)}
                    fullWidth
                >
                    Zaloguj
                </LoadingButton>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    }
                    label='Nie wylogowuj mnie'
                    sx={{ color: "white" }}
                />
                <br />
                <Link href={DOMAIN_URL + "/auth/reset-password"} target='_blank'>
                    Nie pamiętasz hasła?
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href={DOMAIN_URL + "/register"} target='_blank'>
                    Nie masz konta?
                </Link>
            </Box>
        </Stack>
    );
}
