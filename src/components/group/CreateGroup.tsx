import { Button, Container, Stack, Typography } from "@mui/material";
import { panelStandardSize } from "assets/theme";
import { CreateGroupMap } from "components/group/CreateGroupMap";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import { useState } from "react";
import { object, string } from "yup";
import { GroupTypePicker, GroupTypes } from "./GroupTypePicker";

const GROUP_FORM_STATE = {
    name: "",
    description: "",
};

const GROUP_VALIDATION = object().shape({
    name: string()
        .required("Wymagane")
        .min(3, "Nazwa za krótka - Co najmniej 3 znaki")
        .max(50, "Nazwa za długa - Maksymalnie 50 znaków"),
    description: string()
        .required("Wymagane")
        .min(10, "Opis za krótka - Co najmniej 10 znaków")
        .max(280, "Opis za długa - Maksymalnie 280 znaków"),
});

export function CreateGroup() {
    const [coordinate, setCoordinate] = useState<[number, number] | undefined>(undefined);
    const [type, setType] = useState<GroupTypes>(GroupTypes.PUBLIC);

    console.log(coordinate, type);

    const formikGroup = useFormik({
        initialValues: GROUP_FORM_STATE,
        validationSchema: GROUP_VALIDATION,
        onSubmit: ({ name }, { resetForm }) => {
            resetForm();
        },
    });

    return (
        <Container component='main' sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 3, md: 5 }} alignItems='center' width={panelStandardSize}>
                <Stack
                    component={"form"}
                    noValidate
                    onSubmit={formikGroup.handleSubmit}
                    width={"100%"}
                >
                    <Typography variant='h3' textAlign={"center"}>
                        Stwórz grupę
                    </Typography>
                    <GroupTypePicker type={type} setType={setType} />

                    <MyTextField name='name' label='Nazwa grupy' formik={formikGroup} />
                    <MyTextField
                        name='description'
                        label='Opis grupy'
                        multiline={true}
                        rows={5}
                        formik={formikGroup}
                    />

                    <CreateGroupMap setCoordinate={setCoordinate} />

                    <Button
                        color='primary'
                        type='submit'
                        variant='contained'
                        size='medium'
                        fullWidth
                        disabled={!(formikGroup.isValid && formikGroup.dirty && coordinate)}
                    >
                        stwórz
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
