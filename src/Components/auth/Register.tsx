import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Link, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { Link as NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "store/auth-actions";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    nickname: "",
    pseudonym: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
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
        .oneOf([Yup.ref("password"), null], "Hasła muszą być takie same"),
});

function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ pseudonym, email, password }) => {
            dispatch(registerUser(pseudonym, email, password, navigate));
        },
    });

    return (
        <Container component='main' maxWidth='xs'>
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
                    <LockOutlinedIcon fontSize='large' />
                </Avatar>

                <Typography component='h1' variant='h4'>
                    Stwórz konto
                </Typography>

                <Box component={"form"} noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <MyTextField
                        name='pseudonym'
                        label={"Ksywka (pseudonim, Imię i Nazwisko)"}
                        formik={formik}
                    />

                    <MyTextField name='email' label={"Adres email"} formik={formik} />

                    <MyTextField
                        type='password'
                        name='password'
                        label={"Hasło"}
                        autoComplete='new-password'
                        formik={formik}
                    />

                    <MyTextField
                        type='password'
                        name='confirmPassword'
                        label={"Potwierdzenie Hasła"}
                        autoComplete='new-password'
                        formik={formik}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Rejestruj
                    </Button>

                    <Link component={NavLink} to='/login' variant='body2' color='text.secondary'>
                        Masz już konto?
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
export default Register;
