export function dateToUniversalString(date: Date): string {
    return date.toISOString().substring(0, 10);
}

export function createDateWithMonthsRemoved(
    date: Date,
    monthsToRemove: number
): Date {
    return new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30 * monthsToRemove);
}

export function getNextMonday(date: Date) {
    return new Date(date.getTime() + (7 - date.getDay()) * 24 * 60 * 60 * 1000);
}

export function getLastMonday(date: Date) {
    return new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000);
}
