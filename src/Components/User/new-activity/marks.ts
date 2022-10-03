type Marks = { value: number; label: string }[];

export const minMarks: Marks = [
    {
        value: 0,
        label: "0 min",
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
        label: "60 min",
    },
];

export const secMarks: Marks = [
    {
        value: 0,
        label: "0 sec",
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
        label: "60 sec",
    },
];

export function minValueText(value: number) {
    return `${value} min`;
}

export function secValueText(value: number) {
    return `${value} sec`;
}
