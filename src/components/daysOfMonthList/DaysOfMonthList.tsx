import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";
import CalendarCell from "../calendarCell/CalendarCell";

interface IDaysOfMonthList {
  startDay:  moment.Moment,
  displayedDate:  moment.Moment,
  totalDays: number,
  events: IEvent[],
  openCreateEditForm: (
    method: string,
    eventForEdit: IEvent | null,
    day: string | moment.Moment
  ) => void,
  
  openDayMode:(mode: string, date: moment.Moment) => void,
  globalHolidays:IGlobalHoliday[],
}

function DaysOfMonthList({
  startDay,
  totalDays,
  events,
  openCreateEditForm,
  displayedDate,
    openDayMode,
  globalHolidays
}: IDaysOfMonthList) {
  const day = startDay.clone().subtract(1, "day");
  const daysList = [...new Array(totalDays)].map(() => day.add(1, "day").clone());

  return (
    <>
      {daysList.map((dayItem) => (
        <CalendarCell
        key={dayItem.format('YYYY-MM-DD')}
        globalHolidays={globalHolidays.filter((item:any)=>isDayContainCurrentEvent(item,dayItem))}
         openDayMode={openDayMode}
                  dayItem={dayItem}
          events={events.filter((event) =>
            isDayContainCurrentEvent(event, dayItem)
          )}
          openCreateEditForm={openCreateEditForm}
          displayedDate={displayedDate}
        />
      ))}
    </>
  );
}

export default DaysOfMonthList;
