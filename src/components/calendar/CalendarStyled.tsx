import styled from "styled-components";
import "../../styles/variables.css";



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










