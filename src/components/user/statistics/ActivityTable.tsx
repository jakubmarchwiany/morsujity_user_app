import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { deleteActivity } from "store/user-actions";
import { Activity } from "store/user-slice";
import { displayDate, displayTime } from "utils/useful";

const columns: GridColDef[] = [
    {
        field: "type",
        type: "string",
        headerName: "Rodzaj",
        description: "Ta kolumna zawiera informacje na temat typu aktywności",
        align: "center",
        headerAlign: "center",
        flex: 1,
    },
    {
        field: "duration",
        valueFormatter: (params) => displayTime(params.value as number),
        type: "number",
        headerName: "Czas trwania",
        description: "Ta kolumna zawiera informacje na temat czasu trwania aktywności",
        align: "center",
        headerAlign: "center",
        flex: 1,
    },
    {
        field: "date",
        headerName: "Data aktywności",
        description: "Ta kolumna zawiera informacje na temat daty aktywności",
        align: "center",
        headerAlign: "center",
        flex: 2,
    },
    {
        flex: 1,
        field: "delete",
        headerName: "Opcje",
        description: "Ta kolumna zawiera opcje edycji i usuwania aktywności",
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => {
            return (
                <IconButton aria-label='delete'>
                    <Delete />
                </IconButton>
            );
        },
    },
];

export default function ActivityTable() {
    const userActivies = useAppSelector((state) => state.user.statistics?.activity);

    const dispatch = useAppDispatch();

    const addRows = (userActivies: Activity[]) => {
        return userActivies!
            .slice(0)
            .reverse()
            .map((activity) => {
                return {
                    type: activity.isMors ? "Mors" : "Zimny prysznic",
                    date: displayDate(activity.date),
                    duration: activity.duration,
                    id: activity._id,
                };
            });
    };
    const onCellClick = (e: { field: string; row: { id: string } }) => {
        if (e.field === "delete") {
            dispatch(deleteActivity(e.row.id));
        }
    };

    return (
        <div style={{ height: 400 }}>
            <DataGrid
                onCellClick={onCellClick}
                rows={addRows(userActivies!)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableSelectionOnClick={true}
                disableColumnSelector={true}
            />
        </div>
    );
}
