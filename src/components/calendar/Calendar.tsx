import React from "react";
import moment from "moment";
import { IEvent } from "../../types/Interfaces";
import {
  EventItemWrapper,
  EventItemTittle,
  WorldHoliday,
  WorldHolidayWrapper,
  CalendarContainer,
  CellWrapper,
  RowInCell,
  DayWrapper,
  CurrentDay,
  EventListWrapper,
  } from "./CalendarStyled";

type CalendarProps = {
  startDay: any;
  displayedDate: any;
  totalDays: number;
  events: IEvent[];
  openCreateEditForm: any,
};

function Calendar({
  startDay,
  displayedDate,
  totalDays,
  events,
  openCreateEditForm
}: CalendarProps) {
  const day = startDay.clone().subtract(1, "day");
  const daysList = [...Array(totalDays)].map(() => day.add(1, "day").clone());

  const daysOfWeek = (index: number) =>
    moment()
      .day(index + 1)
      .format("ddd");

  const isCurrentDay = (day: any) => moment().isSame(day, "day");
  const isSelectedMonth = (day: any) => displayedDate.isSame(day, "month");

  return (
    <>
      <CalendarContainer isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isSelectedMonth isHeader key={i}>
            {daysOfWeek(i)}
          </CellWrapper>
        ))}
      </CalendarContainer>
      <CalendarContainer>
        {daysList.map((dayItem) => (
          <CellWrapper
            isSelectedMonth={isSelectedMonth(dayItem)}
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            key={dayItem.unix()}
          >
            <RowInCell>
              <DayWrapper onClick={(e)=>openCreateEditForm('Create')}>
                {isCurrentDay(dayItem) ? (
                  <CurrentDay>{dayItem.format("D")}</CurrentDay>
                ) : (
                  dayItem.format("D")
                )}
              </DayWrapper>
            </RowInCell>
            {/* <WorldHolidayWrapper>
            <WorldHoliday>
              world holiday
            </WorldHoliday>
          </WorldHolidayWrapper> */}
            <EventListWrapper>
              {events
                .filter(
                  (event) =>
                    event.date >= dayItem.format("X") &&
                    event.date <= dayItem.clone().endOf("day").format("X")
                )
                .map((filtredEvent) => (
                  <EventItemWrapper key={filtredEvent.id}>
                    <EventItemTittle onClick={()=>openCreateEditForm('Edit',filtredEvent)}>{filtredEvent.title}</EventItemTittle>
                  </EventItemWrapper>
                ))}
            </EventListWrapper>
          </CellWrapper>
        ))}
      </CalendarContainer>
    </>
  );
}

export default Calendar;

