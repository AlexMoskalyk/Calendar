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


  export   const prepareDate = (day: number, time: number) => {
    // Combine the day and time into a single moment object
    // debugger
    const dateTime = moment.unix(day).hour(moment.unix(time).hour()).minute(moment.unix(time).minute()).format('X');
  
    return dateTime;
  }