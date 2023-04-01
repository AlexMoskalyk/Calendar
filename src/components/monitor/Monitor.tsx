import React from 'react';
import {MonitorContainer,TextWrapper,TittleWrapper,ButtonWrapper,TodayButton} from './MonitorStyled'

type  MonitorProps = {
  displayedDate:any,
  prevHandler:any,
  todayHandler:any,
  nextHandler:any
}

function Monitor({displayedDate,prevHandler,todayHandler,nextHandler}:MonitorProps) {
  return (
    <MonitorContainer>
      <div>
        <TittleWrapper>{displayedDate.format('MMMM')}</TittleWrapper>
        <TextWrapper>{displayedDate.format('YYYY')}</TextWrapper>
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