type Marks = { value: number; label: string }[];

export const minutesMarks: Marks = [
    {
        value: 0,
        label: "0 m",
    },
    {
        value: 5,
        label: "5",
    },
    {
        value: 10,
        label: "10",
    },
    {
        value: 15,
        label: "15",
    },
    {
        value: 30,
        label: "30",
    },
    {
        value: 45,
        label: "45",
    },
    {
        value: 60,
        label: "60 m",
    },
];

export const secundsMarks: Marks = [
    {
        value: 0,
        label: "0 s",
    },
    {
        value: 15,
        label: "15",
    },
    {
        value: 30,
        label: "30",
    },
    {
        value: 45,
        label: "45",
    },
    {
        value: 60,
        label: "60 s",
    },
];

export function minutesValueText(value: number) {
    return `${value} min`;
}

export function secundsValueText(value: number) {
    return `${value} sec`;
}
