import styled from "styled-components";
import "../../styles/variables.css";

type CellWrapperProps = {
  isWeekend?:boolean;
  isHeader?:boolean;
  isSelectedMonth?:boolean;
}

type CalendarContainerProps ={
  isHeader?:boolean;
}


export const CalendarContainer = styled.div<CalendarContainerProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? 'var(--cell-bg-color)': 'var(--grid-color)'};
  ${props => props.isHeader && 'border-bottom: 1px solid var(--grid-color)'};
`;

export const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: ${props => props.isHeader ? '24px' : '80px'};
  background-color:${props => props.isWeekend ? `var(--cell-weekend-bg-color)` : `var(--cell-bg-color)`};
  color:${props=>props.isSelectedMonth ? 'var(--cell-color)' : 'var(--cell-notSelectedMonth-color)'};
`;

export const RowInCell = styled.div`
  display: flex;
  justify-content: end;
`;

export const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 33px;
  margin:2px;
`;

export const CurrentDay = styled.div`
height:100%;
width:100%;
border-radius:50%;
background-color:var(--currentDay-bg-color);
color:var(--currentDay-color);
display:flex;
align-items:center;
justify-content:center;
`;
