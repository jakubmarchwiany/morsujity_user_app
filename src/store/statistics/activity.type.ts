import { ActivityType } from "store/statistics/activity_type.type";

export type Activity = {
    _id: string;
    type: ActivityType;
    date: string;
    duration: number;
};
