import { Button, Link, Modal, styled, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { requestResetPassword } from "Store/auth-actions";
import * as Yup from "yup";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const INITIAL_FORM_STATE = {
    email: "",
};

const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required("Wymagane").email("Email niepoprawny"),
});

function ResetPassword() {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ email }) => {
            dispatch(requestResetPassword(email));
            setOpen(false);
        },
    });

    return (
        <>
            <Link
                component="button"
                variant="body2"
                underline="hover"
                type="button"
                color="text.color"
                onClick={() => setOpen(true)}
            >
                Zapomniałeś hasło?
            </Link>
            <StyledModal
                open={open}
                onClose={() => setOpen(false)}
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
                    <Typography variant="h5" textAlign="center" mt={3} color="text.primary">
                        Resetowanie Hasła
                    </Typography>
                    <Typography mt={3}>
                        Na twój adres mailowy zostanie wysłany link resetujący hasło
                    </Typography>
                    <TextField
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        label="Email"
                        fullWidth
                        sx={{ mt: 3 }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 3 }}
                        disabled={!(formik.isValid && formik.dirty)}
                    >
                        Wyślij
                    </Button>
                </Box>
            </StyledModal>
        </>
    );
}

export default ResetPassword;
