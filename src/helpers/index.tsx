import moment from 'moment';

export const isCurrentDay = (day: any) => moment().isSame(day, "day");
export const isSelectedMonth = (day: any,displayedDate:any) => displayedDate.isSame(day, "month");
export const isDayContainCurrentEvent = (event: any,dayItem:any) => event.date >= dayItem.format("X") && event.date <= dayItem.clone().endOf("day").format("X");