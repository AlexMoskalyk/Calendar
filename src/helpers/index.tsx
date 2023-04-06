import moment from "moment";
import { IEvent, IGlobalHoliday } from "../types/Interfaces";

export const isCurrentDay = (day: any) => moment().isSame(day, "day");
export const isSelectedMonth = (day: any, displayedDate: any) =>
  displayedDate.isSame(day, "month");
export const isDayContainCurrentEvent = (event: any, dayItem: any) =>
  event.date >= dayItem.clone().startOf("day").format("X") &&
  event.date <= dayItem.clone().endOf("day").format("X");

  export function isEventGlobalHoliday(event: IEvent | IGlobalHoliday): event is IGlobalHoliday {
    return (event as IGlobalHoliday).globalHoliday === true;
  }