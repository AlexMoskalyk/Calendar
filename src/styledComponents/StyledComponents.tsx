import styled from "styled-components";
import '../styles/variables.css';


type CellWrapperProps = {
    isWeekend?:boolean;
    isHeader?:boolean;
    isSelectedMonth?:boolean;
  }

export const CellWrapper = styled.div<CellWrapperProps>`
  min-width: 140px;
  min-height: ${props => props.isHeader ? '24px' : '95px'};
  background-color:${props => props.isWeekend ? `var(--cell-weekend-bg-color)` : `var(--cell-bg-color)`};
  color:${props=>props.isSelectedMonth ? 'var(--cell-color)' : 'var(--cell-notSelectedMonth-color)'};
`;

export const RowInCell = styled.div`
  display: flex;
  justify-content: end;
  
`;