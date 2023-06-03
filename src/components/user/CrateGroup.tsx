import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Container, Stack, ToggleButton, Typography } from "@mui/material";
import MyTextField from "components/my/MyTextField";
import MyToggleButtonGroup from "components/my/MyToggleButtonGroup";
import { useFormik } from "formik";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import * as Yup from "yup";
import NewGroupMap from "./maps/NewGroupMap";
import { postFetch } from "utils/fetches";

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
        .max(280, "Opis za długa - Maksymalnie 280 znaków"),
});

function CreateGroup() {
    const [isLoading, setIsLoading] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [coordinates, setCoordinates] = useState<[number, number]>([19, 52]);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const formikNewGroup = useFormik({
        initialValues: INITIAL_FORM_STATE,
        validationSchema: FORM_VALIDATION,
        onSubmit: ({ name, description }, { resetForm }) => {
            setIsLoading(true);



        },
    });

    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 15, xl: 30 },
            }}
        >
            <Stack px={5} py={3} borderRadius={5} boxShadow={5}>
                <Typography variant='h3' mb={2} textAlign='center'>
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
                        name='description'
                        label='Opis'
                        multiline
                        minRows={3}
                        maxRows={5}
                        sx={{ mb: 1, input: { color: "white" } }}
                        formik={formikNewGroup}
                    />
                    <MyToggleButtonGroup
                        color='secondary'
                        value={isPublic}
                        exclusive
                        size='small'
                        onChange={(event, value: boolean) => {
                            if (value !== null) setIsPublic(value!);
                        }}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        <ToggleButton value={true}>Publiczna</ToggleButton>
                        <ToggleButton value={false}>Prywatna</ToggleButton>
                    </MyToggleButtonGroup>

                    {isMapVisible ? (
                        <NewGroupMap coordinates={coordinates} setCoordinates={setCoordinates} />
                    ) : (
                        <Button
                            fullWidth
                            color='secondary'
                            variant='outlined'
                            onClick={() => setIsMapVisible(true)}
                        >
                            Ustaw lokalizacje grupy
                        </Button>
                    )}

                    <LoadingButton
                        loading={isLoading}
                        type='submit'
                        variant='contained'
                        disabled={!(formikNewGroup.isValid && formikNewGroup.dirty && isMapVisible)}
                        fullWidth
                        sx={{ my: 1 }}
                    >
                        Stwórz grupę
                    </LoadingButton>
                </Box>
            </Stack>
        </Container>
    );
}

export default CreateGroup;
