import { dateInMiliseconds, monthNames } from "../contants";

export function getMonthName(date: string) {
  return monthNames[new Date(date).getMonth()];
}
export function getMonth(date: string) {
  return new Date(date).getMonth();
}

export function getYear(date: string) {
  return new Date(date).getFullYear();
}
export function getDate(date: string) {
  return new Date(date).getDate();
}
export function getLastYear(date: string) {
  const dateObj = new Date(date);
  const newDate =
    (dateObj.getFullYear() - 1).toString().padStart(4, "0") +
    "-" +
    (dateObj.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dateObj.getDate().toString().padStart(2, "0");
  return Number.isNaN(new Date(newDate).getTime())
    ? (dateObj.getFullYear() - 1).toString().padStart(4, "0") +
        "-" +
        (dateObj.getMonth() + 1).toString().padStart(2, "0") +
        "-01"
    : newDate;
}
export function getNextYear(date: string) {
  const dateObj = new Date(date);
  const newDate =
    (dateObj.getFullYear() + 1).toString().padStart(4, "0") +
    "-" +
    (dateObj.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dateObj.getDate().toString().padStart(2, "0");
  return Number.isNaN(new Date(newDate).getTime())
    ? (dateObj.getFullYear() + 1).toString().padStart(4, "0") +
        "-" +
        (dateObj.getMonth() + 1).toString().padStart(2, "0") +
        "-01"
    : newDate;
}
export function getNextMonth(date: string) {
  const dateObj = new Date(date);
  if (dateObj.getMonth() + 1 > 11) {
    const newDate =
      (dateObj.getFullYear() + 1).toString().padStart(4, "0") +
      "-01-" +
      dateObj.getDate().toString().padStart(2, "0");
    return Number.isNaN(new Date(newDate).getTime())
      ? (dateObj.getFullYear() + 1).toString().padStart(4, "0") + "-01-01"
      : newDate;
  } else {
    const newDate =
      dateObj.getFullYear().toString().padStart(4, "0") +
      "-" +
      (dateObj.getMonth() + 2).toString().padStart(2, "0") +
      "-" +
      dateObj.getDate().toString().padStart(2, "0");
    return Number.isNaN(new Date(newDate).getTime())
      ? dateObj.getFullYear().toString().padStart(4, "0") +
          "-" +
          (dateObj.getMonth() + 2).toString().padStart(2, "0") +
          "-01"
      : newDate;
  }
}
export function getLastMonth(date: string) {
  const dateObj = new Date(date);
  if (dateObj.getMonth() < 1) {
    const newDate =
      (dateObj.getFullYear() - 1).toString().padStart(4, "0") +
      "-12-" +
      dateObj.getDate().toString().padStart(2, "0");
    return Number.isNaN(new Date(newDate).getTime())
      ? (dateObj.getFullYear() - 1).toString().padStart(4, "0") + "-12-01"
      : newDate;
  } else {
    const newDate =
      dateObj.getFullYear().toString().padStart(4, "0") +
      "-" +
      dateObj.getMonth().toString().padStart(2, "0") +
      "-" +
      dateObj.getDate().toString().padStart(2, "0");
    return Number.isNaN(new Date(newDate).getTime())
      ? dateObj.getFullYear().toString().padStart(4, "0") +
          "-" +
          dateObj.getMonth().toString().padStart(2, "0") +
          "-01"
      : newDate;
  }
}

export function getFirstSundayMiliSecondTimeOfYear(date: string) {
  var startOfYear = new Date(
    getYear(date).toString().padStart(4, "0") + "-01-01"
  ).getTime();
  while (true) {
    if (new Date(startOfYear).getDay() === 0) {
      return startOfYear;
    }
    startOfYear += dateInMiliseconds;
  }
}
export function computeRangeOfDates(date: string): Date[] {
  const startDateOfMonth = date.split("-").slice(0, 2).join("-") + "-01";
  const FirstSundayOfYearInMiliSeconds =
    getFirstSundayMiliSecondTimeOfYear(startDateOfMonth);
  const startOfTargetDate = new Date(startDateOfMonth).getTime();
  const differenceInMiliseconds =
    startOfTargetDate - FirstSundayOfYearInMiliSeconds;
  const setOff = differenceInMiliseconds % (42 * dateInMiliseconds);

  var startDateInMiliSeconds =
    startOfTargetDate -
    ((startOfTargetDate - setOff) % (7 * dateInMiliseconds));

  const dates: Date[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(startDateInMiliSeconds));
    startDateInMiliSeconds += dateInMiliseconds;
  }

  return dates;
}
