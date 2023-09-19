import { ToggleButton, Tooltip } from "@mui/material";
import { MyToggleButtonGroup } from "components/my/MyToggleButtonGroup";
import React, { Dispatch } from "react";

export enum GroupTypes {
    PUBLIC,
    PUBLIC_WITH_INVITE,
    PRIVATE,
}

type Props = {
    type: GroupTypes;
    setType: Dispatch<React.SetStateAction<GroupTypes>>;
};

export function GroupTypePicker({ type, setType }: Props) {
    return (
        <MyToggleButtonGroup
            value={type}
            exclusive
            onChange={(event, value: GroupTypes) => {
                if (value !== null) setType(value);
            }}
            fullWidth
            sx={{
                mt: 3,
            }}
        >
            <ToggleButton value={GroupTypes.PUBLIC}>
                <Tooltip
                    title={
                        <div>
                            Grupa widoczna w wyszukiwarce.
                            <br />
                            Wszyscy mogą dołączyć.
                        </div>
                    }
                    placement='top'
                >
                    <span>Publiczna</span>
                </Tooltip>
            </ToggleButton>
            <ToggleButton value={GroupTypes.PUBLIC_WITH_INVITE}>
                <Tooltip
                    title={
                        <div>
                            Grupa widoczna w wyszukiwarce.
                            <br />
                            Tylko osoby przyjęte mogą dołaczyć.
                        </div>
                    }
                    placement='top'
                >
                    <span>Publiczna+</span>
                </Tooltip>
            </ToggleButton>
            <ToggleButton value={GroupTypes.PRIVATE}>
                <Tooltip
                    title={
                        <div>
                            Grupa nie widoczna w wyszukiwarce.
                            <br />
                            Tylko osoby zaproszone mogą dołączyć.
                        </div>
                    }
                    placement='top'
                >
                    <span>Prywatna</span>
                </Tooltip>
            </ToggleButton>
        </MyToggleButtonGroup>
    );
}
