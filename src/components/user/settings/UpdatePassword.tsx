import { Button, Stack, Typography } from "@mui/material";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { updatePassword } from "store/user/user.actions";
import { object, ref, string } from "yup";

const NEW_PASSWORD_FORM_STATE = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const NEW_PASSWORD_VALIDATION = object().shape({
    oldPassword: string().required("Wymagane"),
    newPassword: string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)"),
    confirmNewPassword: string()
        .required("Wymagane")
        .oneOf([ref("newPassword")], "Hasła muszą być takie same"),
});

export function UpdatePassword() {
    const dispatch = useAppDispatch();

    const formikNewPassword = useFormik({
        initialValues: NEW_PASSWORD_FORM_STATE,
        validationSchema: NEW_PASSWORD_VALIDATION,
        onSubmit: ({ oldPassword, newPassword }) => {
            dispatch(updatePassword(oldPassword, newPassword));
        },
    });
    return (
        <Stack component={"form"} noValidate onSubmit={formikNewPassword.handleSubmit} mt={2}>
            <Typography variant='h4'>Zmiana Hasła</Typography>

            <MyTextField
                type='password'
                name='oldPassword'
                label='Aktualne Hasło'
                formik={formikNewPassword}
                sx={{ mt: 1 }}
            />

            <Stack direction={"row"} gap={0.2}>
                <MyTextField
                    type='password'
                    name='newPassword'
                    label='Nowe Hasło'
                    formik={formikNewPassword}
                />

                <MyTextField
                    type='password'
                    name='confirmNewPassword'
                    label='Pot. Nowego Hasła'
                    formik={formikNewPassword}
                />
            </Stack>
            <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={!(formikNewPassword.isValid && formikNewPassword.dirty)}
            >
                Zmień Hasło
            </Button>
        </Stack>
    );
}
