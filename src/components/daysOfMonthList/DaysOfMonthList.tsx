import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import { IEvent } from "../../types/Interfaces";
import CalendarCell from "../calendarCell/CalendarCell";

interface IDaysOfMonthList {
  startDay: any;
  displayedDate: any;
  totalDays: number;
  events: IEvent[];
  openCreateEditForm: any;
}

function DaysOfMonthList({
  startDay,
  totalDays,
  events,
  openCreateEditForm,
  displayedDate,
}: IDaysOfMonthList) {
  const day = startDay.clone().subtract(1, "day");
  const daysList = [...Array(totalDays)].map(() => day.add(1, "day").clone());

  return (
    <>
      {daysList.map((dayItem) => (
        <CalendarCell  dayItem={dayItem} events={events.filter((event) => isDayContainCurrentEvent(event, dayItem))} openCreateEditForm={openCreateEditForm} displayedDate={displayedDate} />
      ))}
    </>
  );
}

export default DaysOfMonthList;
