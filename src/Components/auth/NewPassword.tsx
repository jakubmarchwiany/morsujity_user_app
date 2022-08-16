import { Box, Button, Modal, styled, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "Store/auth-actions";

import * as Yup from "yup";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

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

    let { token } = useParams();
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
        <StyledModal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                component={"form"}
                noValidate
                onSubmit={formik.handleSubmit}
                bgcolor={"background.paper"}
                color={"text.primary"}
                px={5}
                borderRadius={2}
            >
                <Typography variant="h5" textAlign="center" mt={3}>
                    Nowe Hasło
                </Typography>

                <TextField
                    className="textFieldPassword"
                    type="text"
                    name="password"
                    id="password"
                    autoComplete="off"
                    label="Hasło"
                    variant="standard"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    className="textFieldPassword"
                    type="text"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="off"
                    label="Potwierdzenie Hasła"
                    variant="standard"
                    sx={{ mt: 1 }}
                    fullWidth
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 3 }}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Zmień
                </Button>
            </Box>
        </StyledModal>
    );
}

export default NewPassword;
