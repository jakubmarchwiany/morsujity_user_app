import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { postFetch } from "utils/fetches";
import { sleeper } from "utils/useful";
import * as Yup from "yup";

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
                    await sleeper(3);
                    window.location.reload();
                })
                .catch(() => {
                    resetForm();
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
                py: { xs: 1, sm: 2, md: 3, lg: 4 },
                px: { xs: 5, sm: 20, md: 40, lg: 50, xl: 60 },
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
                    <Box
                        component={"form"}
                        noValidate
                        sx={{ mt: 2 }}
                        onSubmit={formikLogin.handleSubmit}
                    >
                        <MyTextField name='email' label='Email' formik={formikLogin} />
                        <MyTextField
                            name='password'
                            label='Hasło'
                            type='password'
                            formik={formikLogin}
                        />

                        {/* <MyLinkButton
                            text='Nie pamiętasz hasła?'
                            href='/auth/reset-password'
                            isActive={false}
                            size='small'
                            fullWidth={false}
                        /> */}
                        <LoadingButton
                            loading={isLoading}
                            type='submit'
                            variant='contained'
                            disabled={!(formikLogin.isValid && formikLogin.dirty)}
                            fullWidth
                        >
                            Zaloguj
                        </LoadingButton>

                        {/* <MyLinkButton
                            text='Nie masz konta?'
                            href='/register'
                            isActive={false}
                            size='small'
                            fullWidth={false}
                        /> */}
                    </Box>
                </Stack>
            )}
        </Container>
    );
}
export default LoadingPage;
