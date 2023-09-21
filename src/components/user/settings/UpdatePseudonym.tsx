import { Button, Stack, Typography } from "@mui/material";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { updatePseudonym } from "store/user/user.actions";
import { object, string } from "yup";

const PSEUDONYM_FORM_STATE = {
    pseudonym: ""
};

const PSEUDONYM_VALIDATION = object().shape({
    pseudonym: string()
        .required("Wymagane")
        .min(3, "Ksywka za krótka - Co najmniej 3 znaki")
        .max(30, "Ksywka za długa - Maksymalnie 30 znaków")
});

export function UpdatePseudonym(): JSX.Element {
    const pseudonym = useAppSelector((state) => state.user.pseudonym);

    const dispatch = useAppDispatch();

    const formikPseudonym = useFormik({
        initialValues: PSEUDONYM_FORM_STATE,
        validationSchema: PSEUDONYM_VALIDATION,
        onSubmit: ({ pseudonym }, { resetForm }) => {
            dispatch(updatePseudonym(pseudonym));
            resetForm();
        }
    });

    return (
        <Stack component={"form"} noValidate onSubmit={formikPseudonym.handleSubmit}>
            <Typography variant="h4">Zmiana Ksywki</Typography>
            <MyTextField
                name="pseudonym"
                label="Ksywka"
                placeholder={pseudonym}
                formik={formikPseudonym}
                sx={{ mt: 1 }}
            />
            <Button
                color="primary"
                type="submit"
                variant="contained"
                size="medium"
                fullWidth
                disabled={!(formikPseudonym.isValid && formikPseudonym.dirty)}
            >
                Zmień
            </Button>
        </Stack>
    );
}
