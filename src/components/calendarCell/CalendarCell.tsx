import React from 'react';
import { isCurrentDay, isSelectedMonth } from '../../helpers';
import { CellWrapper, RowInCell } from '../../styledComponents/StyledComponents';
import { IEvent } from '../../types/Interfaces';
import { CurrentDay, DayWrapper, EventItemTittle, EventItemWrapper, EventListWrapper } from './CalendarCellStyled';

interface ICalendarCell {
    displayedDate: any;
    events: IEvent[];
    openCreateEditForm: any;
    dayItem:any;
  }


function CalendarCell({dayItem,displayedDate,openCreateEditForm,events}:ICalendarCell) {
  return (
    <>
    <CellWrapper
          isSelectedMonth={isSelectedMonth(dayItem, displayedDate)}
          isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
          key={dayItem.unix()}
        >
          <RowInCell>
            <DayWrapper
              onClick={() => openCreateEditForm("Create", null, dayItem)}
            >
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
              .slice(0, 2)
              .map((filtredEvent) => (
                <EventItemWrapper key={filtredEvent.id}>
                  <EventItemTittle
                    onClick={() => openCreateEditForm("Edit", filtredEvent)}
                  >
                    {filtredEvent.title}
                  </EventItemTittle>
                </EventItemWrapper>
              ))}
            {events.length > 2 ? (
                <EventItemWrapper key="show more">
                  <EventItemTittle
                   
                  >
                    show more...
                  </EventItemTittle>
                </EventItemWrapper>
              ) : null}
          </EventListWrapper>
        </CellWrapper>
    </>
  )
}

export default CalendarCell