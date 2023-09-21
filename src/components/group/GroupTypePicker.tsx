import { ToggleButton, Tooltip } from "@mui/material";
import { MyToggleButtonGroup } from "components/my/MyToggleButtonGroup";
import React, { Dispatch } from "react";
import { GroupType } from "store/groups/group_type.type";


type Props = {
    type: GroupType;
    setType: Dispatch<React.SetStateAction<GroupType>>;
};

export function GroupTypePicker({ type, setType }: Props) {
    return (
        <MyToggleButtonGroup
            value={type}
            exclusive
            onChange={(event, value: GroupType) => {
                if (value !== null) setType(value);
            }}
            fullWidth
            sx={{
                mt: 3,
            }}
        >
            <ToggleButton value={GroupType.PUBLIC}>
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
            <ToggleButton value={GroupType.PUBLIC_WITH_INVITE}>
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
            <ToggleButton value={GroupType.PRIVATE}>
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
