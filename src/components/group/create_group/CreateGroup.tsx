import { Button, Container, Stack, Typography } from "@mui/material";
import { panelStandardSize } from "assets/theme";
import { CreateGroupMap } from "components/group/create_group/CreateGroupMap";
import { GroupTypePicker } from "components/group/create_group/GroupTypePicker";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch } from "hooks/redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup } from "store/user/group/group.actions";
import { GroupType } from "store/user/group/group_type.type";
import { object, string } from "yup";

const GROUP_FORM_STATE = {
    name: "",
    description: ""
};

const GROUP_VALIDATION = object().shape({
    name: string()
        .required("Wymagane")
        .min(3, "Nazwa za krótka - Co najmniej 3 znaki")
        .max(50, "Nazwa za długa - Maksymalnie 50 znaków"),
    description: string()
        .required("Wymagane")
        .min(10, "Opis za krótka - Co najmniej 10 znaków")
        .max(280, "Opis za długa - Maksymalnie 280 znaków")
});

export function CreateGroup(): JSX.Element {
    const [coordinate, setCoordinate] = useState<[number, number] | undefined>(undefined);
    const [type, setType] = useState<GroupType>(GroupType.PUBLIC);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formikGroup = useFormik({
        initialValues: GROUP_FORM_STATE,
        validationSchema: GROUP_VALIDATION,
        onSubmit: ({ name, description }) => {
            if (coordinate !== undefined) {
                dispatch(createGroup(type, name, description, coordinate, navigate));
            }
        }
    });

    return (
        <Container component="main" sx={{ display: "flex", justifyContent: "center" }}>
            <Stack mt={{ xs: 3, md: 5 }} alignItems="center" width={panelStandardSize}>
                <Stack
                    component={"form"}
                    noValidate
                    onSubmit={formikGroup.handleSubmit}
                    width={"100%"}
                >
                    <Typography variant="h3" textAlign={"center"}>
                        Stwórz grupę
                    </Typography>
                    <GroupTypePicker type={type} setType={setType} />

                    <MyTextField name="name" label="Nazwa grupy" formik={formikGroup} />
                    <MyTextField
                        name="description"
                        label="Opis grupy"
                        multiline={true}
                        rows={5}
                        formik={formikGroup}
                    />

                    <CreateGroupMap setCoordinate={setCoordinate} />

                    <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        size="medium"
                        fullWidth
                        disabled={!formikGroup.isValid || !formikGroup.dirty}
                    >
                        stwórz
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}