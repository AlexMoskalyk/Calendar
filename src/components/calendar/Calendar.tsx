import React from "react";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";

import { CalendarContainer } from "./CalendarStyled";
import CalendarHeader from "../calendarHeader/CalendarHeader";
import DaysOfMonthList from "../daysOfMonthList/DaysOfMonthList";

type CalendarProps = {
  startDay: moment.Moment,
  displayedDate: moment.Moment,
  totalDays: number,
  events: IEvent[],
  openCreateEditForm: (
    method: string,
    eventForEdit: IEvent | null,
    day: string | moment.Moment
  ) => void,
    openDayMode:(mode: string, date: moment.Moment) => void,
  globalHolidays:IGlobalHoliday[],
};

function Calendar({
  openDayMode,
  startDay,
  displayedDate,
  totalDays,
  events,
  openCreateEditForm,
 globalHolidays
}: CalendarProps) {
  return (
    <>
      <CalendarContainer isHeader>
        <CalendarHeader />
      </CalendarContainer>
      <CalendarContainer>
        <DaysOfMonthList
        globalHolidays={globalHolidays}
        openDayMode={openDayMode}
                  startDay={startDay}
          totalDays={totalDays}
          events={events}
          openCreateEditForm={openCreateEditForm}
          displayedDate={displayedDate}
        />
      </CalendarContainer>
    </>
  );
}

export default Calendar;
