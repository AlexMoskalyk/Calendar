import React from "react";
import { IEvent } from "../../types/Interfaces";

import { CalendarContainer } from "./CalendarStyled";
import CalendarHeader from "../calendarHeader/CalendarHeader";
import DaysOfMonthList from "../daysOfMonthList/DaysOfMonthList";

type CalendarProps = {
  startDay: any,
  displayedDate: any,
  totalDays: number,
  events: IEvent[],
  openCreateEditForm: any,
  setDisplayedMode:any,
  openDayMode:any,
};

function Calendar({
  openDayMode,
  startDay,
  displayedDate,
  totalDays,
  events,
  openCreateEditForm,
  setDisplayedMode
}: CalendarProps) {
  return (
    <>
      <CalendarContainer isHeader>
        <CalendarHeader />
      </CalendarContainer>
      <CalendarContainer>
        <DaysOfMonthList
        openDayMode={openDayMode}
        setDisplayedMode={setDisplayedMode}
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
