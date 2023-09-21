import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { displayDate, displayTime } from "components/user/statistics/display";
import { useAppDispatch } from "hooks/redux";
import toast from "react-hot-toast";
import { deleteActivity } from "store/statistics/activity.actions";
import { Activity } from "store/statistics/activity.type";

type Props = {
    activities: Activity[];
};

export const columns: GridColDef[] = [
    {
        field: "type",
        type: "string",
        headerName: "Rodzaj",
        align: "center",
        headerAlign: "center",
        flex: 1
    },
    {
        field: "duration",
        valueFormatter: (params) => displayTime(params.value as number),
        type: "number",
        headerName: "Czas trwania",
        align: "center",
        headerAlign: "center",
        flex: 1
    },
    {
        field: "date",
        headerName: "Data aktywności",
        align: "center",
        headerAlign: "center",
        flex: 1
    },
    {
        flex: 0.5,
        field: "delete",
        headerName: "Opcje",
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: () => {
            return (
                <IconButton aria-label="delete">
                    <Delete />
                </IconButton>
            );
        }
    }
];

export function ActivitiesTable({ activities }: Props): JSX.Element {
    const dispatch = useAppDispatch();

    const addActivities = (userActivies: Activity[]): any[] => {
        return userActivies.map((activity) => {
            return {
                type: activity.type === 0 ? "Mors" : "Zimny prysznic",
                date: displayDate(activity.date),
                duration: activity.duration,
                activity,
                id: activity._id
            };
        });
    };

    const onCellClick = (e: { field: string; row: { activity: Activity } }): void => {
        if (e.field === "delete") {
            toast.error("Kliknij dwukrotnie by usunać nawyk");
        }
    };

    const onCellDoubleClick = (e: { field: string; row: { activity: Activity } }): void => {
        if (e.field === "delete") {
            dispatch(deleteActivity(e.row.activity));
        }
    };

    return (
        <div style={{ height: 400 }}>
            <DataGrid
                onCellClick={onCellClick}
                onCellDoubleClick={onCellDoubleClick}
                rows={addActivities(activities)}
                columns={columns}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableColumnSelector={true}
            />
        </div>
    );
}
