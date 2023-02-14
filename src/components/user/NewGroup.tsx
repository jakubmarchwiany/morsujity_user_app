import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const INITIAL_FORM_STATE = {
    name: "",
    description: "",
};

const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
        .required("Wymagane")
        .min(3, "Nazwa za krótka - Co najmniej 3 znaki")
        .max(15, "Nazwa za długa - Maksymalnie 50 znaków"),
    description: Yup.string()
        .required("Wymagane")
        .min(20, "Opis za krótka - Co najmniej 20 znaków")
        .max(280, "Opis za długa - Maksymalnie 30 znaków"),
});

function NewGroup() {
    const [isLoading, setIsLoading] = useState(false);

    const formikNewGroup = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: () => {},
    });

    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 30 },
            }}
        >
            <Stack px={5} py={3} borderRadius={5} boxShadow={5}>
                <Typography variant='h3' mb={3} textAlign='center'>
                    Stwórz grupę
                </Typography>

                <Box component={"form"} noValidate onSubmit={formikNewGroup.handleSubmit}>
                    <MyTextField
                        name='name'
                        label='Nazwa'
                        sx={{ input: { color: "white" } }}
                        formik={formikNewGroup}
                    />
                    <MyTextField
                        name='password'
                        label='Opis'
                        sx={{ mb: 2, input: { color: "white" } }}
                        formik={formikNewGroup}
                    />

                    <LoadingButton
                        loading={isLoading}
                        type='submit'
                        variant='contained'
                        disabled={!(formikNewGroup.isValid && formikNewGroup.dirty)}
                        fullWidth
                        sx={{ my: 1 }}
                    >
                        Zaloguj
                    </LoadingButton>
                </Box>
            </Stack>
        </Container>
    );
}

export default NewGroup;
