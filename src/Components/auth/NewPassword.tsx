import { Box, Button, Typography } from "@mui/material";
import MyModal from "components/my/MyModal";

import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "store/auth-actions";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    password: "",
    confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
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

function NewPassword() {
    const [open, setOpen] = useState(true);

    const { token } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ password }) => {
            dispatch(resetPassword(password, token!, navigate));
            setOpen(false);
        },
    });

    return (
        <MyModal open={open}>
            <Box noValidate component={"form"} onSubmit={formik.handleSubmit}>
                <Typography variant='h4' textAlign='center' mb={2}>
                    Nowe Hasło
                </Typography>

                <MyTextField
                    name='password'
                    type='password'
                    label='Hasło'
                    autoComplete='new-password'
                    formik={formik}
                />
                <MyTextField
                    name='confirmPassword'
                    type='password'
                    label='Potwierdzenie Hasła'
                    autoComplete='new-password'
                    formik={formik}
                />

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 1 }}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Zmień
                </Button>
            </Box>
        </MyModal>
    );
}
export default NewPassword;
