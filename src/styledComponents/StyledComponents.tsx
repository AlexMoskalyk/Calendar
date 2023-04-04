import styled from "styled-components";
import '../styles/variables.css';


type CellWrapperProps = {
    isWeekend?:boolean;
    isHeader?:boolean;
    isSelectedMonth?:boolean;
  }


  type ButtonWrapperProps = {
    pressed?:boolean,
}



export const ShadowWrapper = styled.div`
 min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;

`;


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

export const EventListWrapper =styled.ul`
width:100%;
display:flex;
flex-direction:column;
align-items:center;
// justify-content:center;
list-style: none;
background-color: #1E1F21;
`;

export const EventItemWrapper = styled.li`
width:100%;
display:flex;
padding-left:2px;
padding-right:2px;
margin-bottom:2px;
`;

export const EventItemTittle =styled.button`
position:relative;
flex-grow:1;
text-overflow:ellipsis;
overflow:hidden;
white-space:nowrap;
width:114px;
border:unset;
background:unset;
color:var(--eventTittle-color);
cursor:pointer;
margin:0;
padding:0;
text-align:left;
background-color:var(--eventTitle-bg-color);
border:1px solid var(--eventTitle-bg-color);
border-radius:2px;

&:hover,:focus{
  background-color:var( --button-bg-hover); 
  }
  
`;

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
border:unset;
background-color:${props => props.pressed ? 'var( --pressed-button-bg-color)'  : 'var( --button-bg-color)' };
height:20px;
border-radius:4px;
color:${props => props.pressed ? 'var( --pressed-button-color)'  : 'var(--button-text-color)' };
cursor:pointer;

&:hover{
background-color:var( --button-bg-hover); 
}

&:not(:last-child){
margin-right:2px;
}
`;