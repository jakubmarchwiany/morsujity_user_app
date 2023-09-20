import { Divider, Typography } from "@mui/material";
import { displayTime } from "components/user/statistics/display";
import { ActivityType } from "store/statistics/activity_type.type";

type Props = {
    totalActivitiesTime: number[];
};

export function TotalActivitiesTimePanel({ totalActivitiesTime }: Props) {
    return (
        <>
            <Divider textAlign='left'>
                <Typography variant='h5' fontWeight={"bold"} textAlign='center'>
                    Czas
                </Typography>
            </Divider>

            <Typography variant='body1' mt={2} ml={"10%"}>
                <b>Morsy:</b> {displayTime(totalActivitiesTime![ActivityType.WinterSwiming])}
            </Typography>
            <Typography variant='body1' mt={1} mb={2} ml={"10%"}>
                <b>Zimne prysznice:</b>{" "}
                {displayTime(totalActivitiesTime![ActivityType.ColdShower])}
            </Typography>
        </>
    );
}
