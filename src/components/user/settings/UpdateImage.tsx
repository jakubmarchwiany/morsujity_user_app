import { Avatar, Button, ButtonGroup, Unstable_Grid2 as Grid2, Typography } from "@mui/material";
import { ImageSelector } from "components/user/settings/ImageSelector";
import "cropperjs/dist/cropper.css";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { setUserImageToDef } from "store/user/user.actions";

export function UpdateImage() {
    const userImage = useAppSelector((state) => state.user.imageUrl);
    const [isImageSelectorOpen, SetIsImageSelectorOpen] = useState(false);

    const dispatch = useAppDispatch();

    const handleSetUserImageToDef = () => {
        dispatch(setUserImageToDef());
    };

    return (
        <>
            <Typography variant='h4'>Zmiana Profilowego</Typography>
            <Grid2 container columns={20} justifyContent='center'>
                <Grid2 xs={20} xl={16} style={{ justifyContent: "center", display: "flex" }}>
                    <Avatar
                        sx={{ my: 2, width: "50%", height: "auto" }}
                        alt='Remy Sharp'
                        src={userImage}
                        variant='rounded'
                    />
                </Grid2>

                <Grid2 xs={20} xl={16}>
                    <ButtonGroup variant='contained' aria-label='outlined button group' fullWidth>
                        <Button
                            type='button'
                            variant='contained'
                            color='error'
                            onClick={() => toast.error("Kliknij dwukrotnie by usunać nawyk")}
                            onDoubleClick={handleSetUserImageToDef}
                            disabled={userImage?.includes("def.webp")}
                        >
                            Usuń zdjęcie
                        </Button>

                        <Button
                            type='button'
                            variant='contained'
                            onClick={() => {
                                SetIsImageSelectorOpen((prev) => !prev);
                            }}
                        >
                            Zmień zdjęcie
                        </Button>
                    </ButtonGroup>
                </Grid2>
            </Grid2>

            {isImageSelectorOpen && <ImageSelector setIsOpen={SetIsImageSelectorOpen} />}
        </>
    );
}
