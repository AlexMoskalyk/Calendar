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

