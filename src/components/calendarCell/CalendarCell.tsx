import React from "react";
import { isCurrentDay, isSelectedMonth, prepareDate } from "../../helpers";
import {
  DISPLAYED_MODE_DAY,
  OPERATION_METHOD_CREATE,
  OPERATION_METHOD_EDIT,
} from "../../helpers/constants";
import {
  CellWrapper,
  EventItemTittle,
  EventItemWrapper,
  EventListWrapper,
  RowInCell,
  WorldHolidayItem,
  WorldHolidayText,
  WorldHolidayWrapper,
} from "../../styledComponents/StyledComponents";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";
import { CurrentDay, DayWrapper } from "./CalendarCellStyled";
import moment from "moment";
import "../../styles/variables.css";

interface ICalendarCell {
  setDraggedEvent: (ev:IGlobalHoliday | IEvent | null)=>void;
  draggedEvent: any;
  dayDropped: any;
  setDayDropped: (value:moment.Moment | string)=>void;
  updateEventAfterDrop: (preparedEvent: IEvent) => void;
  displayedDate: moment.Moment;
  events: IEvent[];
  openCreateEditForm: (
    method: string,
    eventForEdit: IEvent | null,
    day: string | moment.Moment
  ) => void;
  dayItem: any;
  openDayMode: (mode: string, date: moment.Moment) => void;
  globalHolidays: IGlobalHoliday[];
}

function CalendarCell({
  setDraggedEvent,
  draggedEvent,
  setDayDropped,
  dayDropped,
  updateEventAfterDrop,
  globalHolidays,
  dayItem,
  displayedDate,
  openCreateEditForm,
  events,
  openDayMode,
}: ICalendarCell) {
 

  const onDragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {};

  function onDragOverHandler(
    e: React.DragEvent<HTMLDivElement>,
    day: moment.Moment
  ) {
    e.preventDefault();

    const formatedDay = moment(day).format("X");
    const target = e.currentTarget as HTMLElement;
    target.style.background = "var(--button-bg-hover)";
    setDayDropped(formatedDay);
  }

  const onDropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    day: moment.Moment
  ) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const formatedDate = prepareDate(+dayDropped, +draggedEvent.date);
    const preparedEvent = {
      ...draggedEvent,
      date: formatedDate,
    };
    updateEventAfterDrop(preparedEvent);
    if (dayItem.day() === 6 || dayItem.day() === 0) {
      target.style.background = "var( --cell-weekend-bg-color)";
    } else {
      target.style.background = "var( --cell-bg-color)";
    }
  };

  const onDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    event: IGlobalHoliday | IEvent
  ) => {
    setDraggedEvent(event);
  };

  const onDragLeaveHandler = (
    e: React.DragEvent<HTMLDivElement>,
    day: moment.Moment
  ) => {
    const target = e.currentTarget as HTMLElement;

    if (dayItem.day() === 6 || dayItem.day() === 0) {
      target.style.background = "var( --cell-weekend-bg-color)";
    } else {
      target.style.background = "var( --cell-bg-color)";
    }
  };

  return (
    <CellWrapper
      isSelectedMonth={isSelectedMonth(dayItem, displayedDate)}
      isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
      key={dayItem.unix()}
      onDragLeave={(e) => onDragLeaveHandler(e, dayItem)}
      onDragOver={(e) => onDragOverHandler(e, dayItem)}
      onDrop={(e) => onDropHandler(e, dayItem)}
      onDragEnd={(e) => onDragEndHandler(e)}
    >
      <RowInCell>
        <DayWrapper
          onClick={() =>
            openCreateEditForm(OPERATION_METHOD_CREATE, null, dayItem)
          }
        >
          {isCurrentDay(dayItem) ? (
            <CurrentDay>{dayItem.format("D")}</CurrentDay>
          ) : (
            dayItem.format("D")
          )}
        </DayWrapper>
      </RowInCell>
      <WorldHolidayWrapper>
        {globalHolidays.map((item: any) => (
          <WorldHolidayItem key={item.id}>
            <WorldHolidayText
              onClick={() =>
                openCreateEditForm(OPERATION_METHOD_EDIT, item, "")
              }
            >
              {item.title}
            </WorldHolidayText>
          </WorldHolidayItem>
        ))}
      </WorldHolidayWrapper>
      <EventListWrapper>
        {events.slice(0, 2).map((event) => (
          <EventItemWrapper
            key={event.id}
            draggable
            onDragStart={(e) => onDragStart(e, event)}
          >
            <EventItemTittle
              onClick={() =>
                openCreateEditForm(OPERATION_METHOD_EDIT, event, "")
              }
            >
              {event.title}
            </EventItemTittle>
          </EventItemWrapper>
        ))}
        {events.length > 2 ? (
          <EventItemWrapper key={events.length}>
            <EventItemTittle
              onClick={() => openDayMode(DISPLAYED_MODE_DAY, dayItem)}
            >
              show more...
            </EventItemTittle>
          </EventItemWrapper>
        ) : null}
      </EventListWrapper>
    </CellWrapper>
  );
}

export default CalendarCell;
