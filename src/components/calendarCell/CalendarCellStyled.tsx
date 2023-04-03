import styled from 'styled-components';
import '../../styles/variables.css';

export const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33px;
  width: 33px;
  margin:2px;
  cursor:pointer;
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

export const EventListWrapper =styled.ul`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
list-style: none;
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

export const WorldHolidayWrapper = styled.div`
`;

export const WorldHoliday = styled.span`

`;