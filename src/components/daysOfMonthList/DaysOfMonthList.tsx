import React, { useState } from "react";
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
  updateEventAfterDrop:(preparedEvent: IEvent)=>void;
  openDayMode:(mode: string, date: moment.Moment) => void,
  globalHolidays:IGlobalHoliday[],
}

function DaysOfMonthList({
  updateEventAfterDrop,
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
  const [dayDropped, setDayDropped] = useState<moment.Moment | string>('');
  const [draggedEvent, setDraggedEvent] = useState<IGlobalHoliday | IEvent | null>(null);

  return (
    <>
      {daysList.map((dayItem) => (
        <CalendarCell
        draggedEvent={draggedEvent}
        setDraggedEvent={setDraggedEvent}
        dayDropped={dayDropped}
        setDayDropped={setDayDropped}
        updateEventAfterDrop={updateEventAfterDrop}
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
