import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { changeUserPassword, changeUserPseudonym } from "store/user-actions";
import * as Yup from "yup";

const PSEUDONYM_FORM_STATE = {
    pseudonym: "",
};

const NEW_PASSWORD_FORM_STATE = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const PSEUDONYM_VALIDATION = Yup.object().shape({
    pseudonym: Yup.string()
        .required("Wymagane")
        .min(3, "Ksywka za krótka - Co najmniej 3 znaki")
        .max(15, "Ksywka za długa - Maksymalnie 15 znaków"),
});

const NEW_PASSWORD_VALIDATION = Yup.object().shape({
    oldPassword: Yup.string().required("Wymagane"),
    newPassword: Yup.string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)"),
    confirmNewPassword: Yup.string()
        .required("Wymagane")
        .oneOf([Yup.ref("newPassword"), null], "Hasła muszą być takie same"),
});

// const styles = (theme: any) => ({
//     textField: {
//         width: "90%",
//         marginLeft: "auto",
//         marginRight: "auto",
//         paddingBottom: 0,
//         marginTop: 0,
//         fontWeight: 500,
//     },
//     input: {
//         color: "white",
//     },
// });

function Settings() {
    const dispatch = useAppDispatch();

    const pseudonym = useAppSelector((state) => state.user.pseudonym);

    const formikPseudonym = useFormik({
        initialValues: PSEUDONYM_FORM_STATE,
        validationSchema: PSEUDONYM_VALIDATION,
        onSubmit: ({ pseudonym }, { resetForm }) => {
            dispatch(changeUserPseudonym(pseudonym));
            resetForm();
        },
    });

    const formikNewPassword = useFormik({
        initialValues: NEW_PASSWORD_FORM_STATE,
        validationSchema: NEW_PASSWORD_VALIDATION,
        onSubmit: ({ oldPassword, newPassword }, { resetForm }) => {
            dispatch(changeUserPassword(oldPassword, newPassword));
            resetForm();
        },
    });

    return (
        <Box sx={{ mx: { xs: 5, lg: 15 }, mt: 5 }}>
            <Typography variant="h5" fontWeight={"bold"} mt={2}>
                Konto
            </Typography>
            <Typography variant="h3" fontWeight={"bold"}>
                Ustawienia
            </Typography>
            <Box component={"form"} noValidate onSubmit={formikPseudonym.handleSubmit}>
                <Typography variant="h5" fontWeight={"bold"} mt={2}>
                    Zmiana Ksywki
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={5} lg={4}>
                        <MyTextField
                            name="pseudonym"
                            label="Ksywka"
                            placeholder={pseudonym!}
                            formik={formikPseudonym}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={7}
                        lg={8}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    ></Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                            size="medium"
                            fullWidth
                            disabled={!(formikPseudonym.isValid && formikPseudonym.dirty)}
                        >
                            Aktualizuj
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box component={"form"} noValidate onSubmit={formikNewPassword.handleSubmit}>
                <Typography variant="h5" fontWeight={"bold"} mt={2}>
                    Zmiana Hasła
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={5} lg={4}>
                        <MyTextField
                            type="password"
                            name="oldPassword"
                            label="Aktualne Hasło"
                            autoComplete="new-password"
                            formik={formikNewPassword}
                        />
                    </Grid>

                    <Grid item md={7} lg={8} sx={{ display: { xs: "none", md: "flex" } }}></Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <MyTextField
                            type="password"
                            name="newPassword"
                            label="Nowe Hasło"
                            autoComplete="new-password"
                            formik={formikNewPassword}
                        />
                    </Grid>

                    <Grid item xs={12} md={5} lg={4}>
                        <MyTextField
                            type="password"
                            name="confirmNewPassword"
                            label="Pot. Nowego Hasła"
                            autoComplete="new-password"
                            formik={formikNewPassword}
                        />
                    </Grid>
                    <Grid item lg={4} sx={{ display: { xs: "none", lg: "flex" } }}></Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 2 }}
                            disabled={!(formikNewPassword.isValid && formikNewPassword.dirty)}
                        >
                            Aktualizuj Hasło
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
export default Settings;
