import { Avatar, Divider, Tooltip, Typography } from "@mui/material";
import { displayTime } from "components/user/statistics/display";
import { ActivityType } from "store/statistics/activity_type.type";
import { Rank } from "store/statistics/rank.type";

import { ENV } from "utils/validate_env";

const { VITE_GOOGLE_BUCKET_URL } = ENV;

type Props = {
    rank: Rank;
    subRank: Rank;
    totalActivitiesTime: number[];
};

export function RankPanel({ rank, subRank, totalActivitiesTime }: Props) {
    const totalTime =
        totalActivitiesTime![ActivityType.WinterSwiming]! +
        totalActivitiesTime![ActivityType.ColdShower];

    return (
        <>
            <Divider textAlign='left'>
                <Typography variant='h5' fontWeight={"bold"} textAlign='center'>
                    Ranga
                </Typography>
            </Divider>

            <Tooltip
                title={`Następna ranga za ${displayTime(rank.maxValue - totalTime)}`}
                placement='top-start'
                sx={{
                    cursor: "help",
                }}
            >
                <Typography variant='body1' mt={2} ml={"10%"}>
                    <b>Główna:</b> {rank.name}
                </Typography>
            </Tooltip>
            <Tooltip
                title={`Następna poboczna ranga za ${displayTime(subRank.maxValue - totalTime)}`}
                placement='top-start'
                sx={{
                    cursor: "help",
                }}
            >
                <Typography variant='body1' mt={1} ml={"10%"}>
                    <b>Poboczna:</b> {subRank!.name}
                </Typography>
            </Tooltip>
            <Avatar
                sx={{
                    width: "15rem",
                    height: "auto",
                    marginLeft: "10%",
                }}
                alt='Remy Sharp'
                src={`${VITE_GOOGLE_BUCKET_URL}/ranks/${rank!.N}.png`}
                variant='rounded'
            />
        </>
    );
}
