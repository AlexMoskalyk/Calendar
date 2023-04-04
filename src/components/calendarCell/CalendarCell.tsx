import React from 'react';
import { isCurrentDay, isSelectedMonth } from '../../helpers';
import { DISPLAYED_MODE_DAY, OPERATION_METHOD_CREATE, OPERATION_METHOD_EDIT } from '../../helpers/constants';
import { CellWrapper, EventItemTittle, EventItemWrapper, EventListWrapper, RowInCell } from '../../styledComponents/StyledComponents';
import { IEvent } from '../../types/Interfaces';
import { CurrentDay, DayWrapper } from './CalendarCellStyled';

interface ICalendarCell {
    displayedDate: any,
    events: IEvent[],
    openCreateEditForm: any,
    dayItem:any,
    setDisplayedMode:any,
    openDayMode:any
  }


function CalendarCell({dayItem,displayedDate,openCreateEditForm,events,setDisplayedMode,openDayMode}:ICalendarCell) {
  return (
    <>
    <CellWrapper
          isSelectedMonth={isSelectedMonth(dayItem, displayedDate)}
          isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
          key={dayItem.unix()}
        >
          <RowInCell>
            <DayWrapper
              onClick={() => openCreateEditForm(OPERATION_METHOD_CREATE, null, dayItem)}
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
                    onClick={() => openCreateEditForm(OPERATION_METHOD_EDIT, filtredEvent,null)}
                  >
                    {filtredEvent.title}
                  </EventItemTittle>
                </EventItemWrapper>
              ))}
            {events.length > 2 ? (
                <EventItemWrapper key="show more">
                  <EventItemTittle
                   onClick={()=>openDayMode(DISPLAYED_MODE_DAY,dayItem)}
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