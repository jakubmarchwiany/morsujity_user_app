import dayjs from "dayjs";

export const displayTime = (time: number): string => {
    return `${Math.floor(time / 60)} min ${time % 60 !== 0 ? (time % 60) + " sek" : ""}`;
};

export const displayDate = (date: string): string => {
    if (dayjs(date).hour() === 0 && dayjs(date).minute() === 0) {
        return dayjs(date).format("DD.MM.YYYY");
    } else {
        return dayjs(date).format("DD.MM.YYYY HH:mm");
    }
};
