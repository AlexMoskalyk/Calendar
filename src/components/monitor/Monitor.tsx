import React from 'react';
import { DISPLAYED_MODE_DAY, DISPLAYED_MODE_MONTH } from '../../helpers/constants';
import { ButtonWrapper } from '../../styledComponents/StyledComponents';
import {MonitorContainer,YearWrapper,MonthWrapper,TodayButton, DayWrapper} from './MonitorStyled'

type  MonitorProps = {
  displayedDate:any,
  prevHandler:any,
  todayHandler:any,
  nextHandler:any,
  setDisplayedMode:any,
  displayedMode:string,
}

function Monitor({displayedDate,prevHandler,todayHandler,nextHandler,setDisplayedMode,displayedMode}:MonitorProps) {
  return (
    <MonitorContainer>
      <div>
        {
          displayedMode === DISPLAYED_MODE_DAY ? (<DayWrapper>{displayedDate.format('DD')}</DayWrapper>):null
        }
        
        <MonthWrapper>{displayedDate.format('MMMM')}</MonthWrapper>
        <YearWrapper>{displayedDate.format('YYYY')}</YearWrapper>
      </div>
      <div>
        <ButtonWrapper pressed={displayedMode === DISPLAYED_MODE_MONTH} onClick={()=>setDisplayedMode(DISPLAYED_MODE_MONTH)}>Month</ButtonWrapper>
        <ButtonWrapper pressed={displayedMode === DISPLAYED_MODE_DAY} onClick={()=>setDisplayedMode(DISPLAYED_MODE_DAY)}>Day</ButtonWrapper>
      </div>
      <div>
        <ButtonWrapper onClick={prevHandler}>&lt;</ButtonWrapper>
        <TodayButton onClick={todayHandler}>Today</TodayButton>
        <ButtonWrapper onClick={nextHandler}>&gt;</ButtonWrapper>
      </div>
    </MonitorContainer>
  )
}

export default Monitor