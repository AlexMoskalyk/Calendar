import styled from 'styled-components';
import { ButtonWrapper } from '../../styledComponents/StyledComponents';
import '../../styles/variables.css';


export const MonitorContainer = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
background-color: var(--cell-bg-color);
color:var(--cell-color);
padding:16px;
`;

export const YearWrapper = styled.span`
font-size: 32px
`;

export const MonthWrapper = styled(YearWrapper)`
font-weight: bold;
margin-right:8px;
`;

export  const DayWrapper = styled(MonthWrapper)`
`;

// export const ButtonWrapper = styled.button<ButtonWrapperProps>`
// border:unset;
// background-color:${props => props.pressed ? 'var( --pressed-button-bg-color)'  : 'var( --button-bg-color)' };
// height:20px;
// border-radius:4px;
// color:${props => props.pressed ? 'var( --pressed-button-color)'  : 'var(--button-text-color)' };
// cursor:pointer;

// &:hover{
// background-color:var( --button-bg-hover); 
// }

// &:not(:last-child){
// margin-right:2px;
// }
// `;

export const TodayButton = styled(ButtonWrapper)`
padding:0 16px;
font-weight:bold;
`;