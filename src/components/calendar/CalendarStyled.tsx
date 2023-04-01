import styled from "styled-components";
import "../../styles/variables.css";

type CellWrapperProps = {
  isWeekend:boolean;
}

export const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: var(--grid-color);
`;

export const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: 80px;
  background-color:${props => props.isWeekend ? `var(--cell-weekend-bg-color)` : `var(--cell-bg-color)`};
  color: var(--cell-color);
`;

export const RowInCell = styled.div`
  display: flex;
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
