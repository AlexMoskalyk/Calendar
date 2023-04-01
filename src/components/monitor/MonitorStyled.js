import styled from 'styled-components';
import '../../styles/variables.css'

export const MonitorContainer = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
background-color: var(--cell-bg-color);
color:var(--cell-color);
padding:16px;
`;

export const TextWrapper = styled.span`
font-size: 32px
`;

export const TittleWrapper = styled(TextWrapper)`
font-weight: bold;
margin-right:8px;
`;

export const ButtonWrapper = styled.button`
border:unset;
background-color:var( --button-bg-color);
height:20px;
margin-right:2px;
border-radius:4px;
color:var(--button-text-color);
cursor:pointer;

&:hover,:focus{
background-color:var( --button-bg-hover); 
}
`;

export const TodayButton = styled(ButtonWrapper)`
padding:0 16px;
font-weight:bold;
`;