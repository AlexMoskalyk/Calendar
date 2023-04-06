import React from 'react';
import { isCurrentDay, isSelectedMonth } from '../../helpers';
import { DISPLAYED_MODE_DAY, OPERATION_METHOD_CREATE, OPERATION_METHOD_EDIT } from '../../helpers/constants';
import { CellWrapper, EventItemTittle, EventItemWrapper, EventListWrapper, RowInCell, WorldHolidayItem, WorldHolidayText, WorldHolidayWrapper } from '../../styledComponents/StyledComponents';
import { IEvent,IGlobalHoliday } from '../../types/Interfaces';
import { CurrentDay, DayWrapper} from './CalendarCellStyled';

interface ICalendarCell {
    displayedDate: moment.Moment,
    events: IEvent[],
    openCreateEditForm: (
      method: string,
      eventForEdit: IEvent | null,
      day: string | moment.Moment
    ) => void,
    dayItem:any,
    openDayMode:(mode: string, date: moment.Moment) => void,
    globalHolidays:IGlobalHoliday[],
  }


function CalendarCell({globalHolidays,dayItem,displayedDate,openCreateEditForm,events,openDayMode}:ICalendarCell) {
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
          <WorldHolidayWrapper>
            {
              globalHolidays.map((item:any)=>(
              <WorldHolidayItem key={item.id}>
               <WorldHolidayText 
                onClick={()=>openCreateEditForm(OPERATION_METHOD_EDIT, item,'')}>
               {item.title}
               </WorldHolidayText>
              </WorldHolidayItem>))
            }
            
          </WorldHolidayWrapper>
          <EventListWrapper>
            {events
              .slice(0, 2)
              .map((event) => (
                <EventItemWrapper key={event.id}>
                  <EventItemTittle
                    onClick={() => openCreateEditForm(OPERATION_METHOD_EDIT, event,'')}
                  >
                    {event.title}
                  </EventItemTittle>
                </EventItemWrapper>
              ))}
            {events.length > 2 ? (
                <EventItemWrapper key={events.length}>
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