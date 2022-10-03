/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Avatar, Button, ButtonGroup, Stack, Unstable_Grid2 as Grid2 } from "@mui/material";
import DialogConfirm from "components/my/DialogConfirm";
import MyModal from "components/my/MyModal";
import "cropperjs/dist/cropper.css";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import Cropper from "react-cropper";

import { changeToDefUserImage, changeUserImage } from "store/user-actions";

const { VITE_DEF_USER_IMAGE: DEF_USER_IMAGE } = import.meta.env;

const userDefImage = new URL(DEF_USER_IMAGE, import.meta.url).href;

function ImageOptions() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openChangeImage, setOpenChangeImage] = useState(false);
    const [image, setImage] = useState(undefined);
    const [cropData, setCropData] = useState(undefined);
    const [cropper, setCropper] = useState<any>();

    const userImage = useAppSelector((state) => state.user.image);
    const dispatch = useAppDispatch();

    const handleDecision = (decision: boolean) => {
        setOpenDialog(false);

        if (decision) dispatch(changeToDefUserImage());
    };

    const handleDeleteUserImage = () => {
        setOpenDialog(true);
    };

    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const handleCloseChangeImage = () => {
        setOpenChangeImage(false);
        setImage(undefined);
        setCropData(undefined);
    };

    const handleChangeImage = () => {
        setOpenChangeImage(false);
        setImage(undefined);
        setCropData(undefined);
        dispatch(changeUserImage(cropData!));
    };

    return (
        <>
            <Grid2 container columns={20}>
                <Grid2 xs={20} xl={16} style={{ justifyContent: "center", display: "flex" }}>
                    <Avatar
                        sx={{ my: 2, width: 250, height: 250 }}
                        alt='Remy Sharp'
                        src={userImage === "def" ? userDefImage! : userImage!}
                        variant='rounded'
                    />
                </Grid2>
                <Grid2 xs={4}></Grid2>
                <Grid2 xs={20} xl={16}>
                    <ButtonGroup variant='contained' aria-label='outlined button group' fullWidth>
                        <Button
                            type='button'
                            variant='contained'
                            color='error'
                            onClick={handleDeleteUserImage}
                            disabled={userImage === DEF_USER_IMAGE}
                        >
                            Usuń zdjęcie
                        </Button>

                        <Button
                            type='button'
                            variant='contained'
                            onClick={() => {
                                setOpenChangeImage(true);
                            }}
                        >
                            Nowe zdjęcie
                        </Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>
            <DialogConfirm
                content='Czy chcesz ustawić domyślne zdjęcie profilowe?'
                open={openDialog}
                onClose={handleDecision}
            />
            <MyModal
                open={openChangeImage}
                onClose={handleCloseChangeImage}
                sx={{
                    overflow: "scroll",
                    width: "521px",
                    height: "80%",
                    display: "block",
                }}
            >
                <Stack bgcolor={"background.paper"} color={"text.primary"}>
                    <Button variant='contained' component='label'>
                        Wybierz zdjęcie
                        <input hidden accept='image/*' type='file' onChange={onChange} />
                    </Button>
                    <Cropper
                        style={{
                            maxHeight: "500px",
                            maxWidth: "500px",
                        }}
                        aspectRatio={1}
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={50}
                        minCropBoxWidth={50}
                        background={true}
                        center={true}
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                    <Button
                        type='button'
                        variant='contained'
                        onClick={getCropData}
                        disabled={!image}
                    >
                        Wytnij
                    </Button>
                    <img
                        style={{
                            maxHeight: "500px",
                            maxWidth: "500px",
                        }}
                        src={cropData}
                        alt='Wycięte zdjęcie'
                    />
                    <Button
                        type='button'
                        variant='contained'
                        disabled={!cropData}
                        onClick={handleChangeImage}
                    >
                        Ustaw
                    </Button>
                </Stack>
            </MyModal>
        </>
    );
}

export default ImageOptions;
