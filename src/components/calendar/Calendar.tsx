import React from 'react';
import moment from 'moment';
import { CalendarContainer,CellWrapper,RowInCell,DayWrapper,CurrentDay } from './CalendarStyled';

function Calendar({startDay}:{startDay:any}) {
  const totalDays = 42;
  const day = startDay.clone().subtract(1,'day');
  const daysList = [...Array(42)].map(()=> day.add(1,'day').clone());
  
  const isCurrentDay = (day:any) => moment().isSame(day,'day');
  
  return (
    <CalendarContainer>
      {daysList.map((dayItem)=>(
        <CellWrapper 
        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
        key={dayItem.unix()} >
          <RowInCell>
            <DayWrapper>
              {isCurrentDay(dayItem) ? <CurrentDay>{dayItem.format('D')}</CurrentDay> : dayItem.format('D')}
            </DayWrapper>
          </RowInCell>
        </CellWrapper>
      )
      )}
    </CalendarContainer>
  )
}

export default Calendar