import { Button, Modal, Stack } from "@mui/material";
import { useAppDispatch } from "hooks/redux";
import { Dispatch, useState } from "react";
import { Cropper } from "react-cropper";
import { updateUserImage } from "store/user/user.actions";

type Props = {
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export function ImageSelector({ setIsOpen }: Props) {
    const [image, setImage] = useState(undefined);
    const [cropData, setCropData] = useState(undefined);
    const [cropper, setCropper] = useState<any>();

    const dispatch = useAppDispatch();

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
        setIsOpen(false);
        setImage(undefined);
        setCropData(undefined);
    };

    const handleChangeImage = () => {
        setIsOpen(false);
        setImage(undefined);
        setCropData(undefined);
        dispatch(updateUserImage(cropData!));
    };

    return (
        <Modal
            open={true}
            onClose={handleCloseChangeImage}
            sx={{
                overflow: "scroll",
                paddingBottom: "10%",
                mb: "5%",
            }}
        >
            <Stack
                bgcolor={"background.paper"}
                color={"text.primary"}
                sx={{
                    position: "absolute" as "absolute",
                    top: "5%",
                    left: "50%",
                    transform: "translate(-50%, 0%)",
                    // width: panelStandardSize,
                    boxShadow: 10,
                }}
            >
                <Button variant='contained' component='label'>
                    Wybierz zdjęcie
                    <input hidden accept='image/*' type='file' onChange={onChange} />
                </Button>

                {image && (
                    <>
                        <Cropper
                            style={{
                                height: "auto",
                                width: "50vh",
                                alignSelf: "center",
                            }}
                            aspectRatio={1}
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={100}
                            minCropBoxWidth={100}
                            background={true}
                            center={true}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                        />
                        <Button type='button' variant='contained' onClick={getCropData}>
                            Wytnij
                        </Button>
                    </>
                )}

                {cropData && (
                    <>
                        <img
                            src={cropData}
                            style={{
                                maxHeight: "40vh",
                                maxWidth: "40vh",
                                alignSelf: "center",
                            }}
                        />
                        <Button type='button' variant='contained' onClick={handleChangeImage}>
                            Ustaw
                        </Button>
                    </>
                )}
            </Stack>
        </Modal>
    );
}
