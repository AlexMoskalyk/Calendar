import styled from 'styled-components';
import '../../styles/variables.css';

export const ShowDayWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;;
`;

export const EventFormWrapper = styled('div')`
  background-color: #27282A;
  color: #DDDDDD;
  width: 420px;
  position: relative;
  border-left: 1px solid #464648;;
`;
export const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;

export const FormEventTitle = styled.input`
padding: 8px 14px;
font-size:: 13.6px;
width:100%;
border:unset;
background-color:var(--form-input-bg-color);
color:var(--form-input-color);
outline:unset;
border-bottom: 1px solid var(--form-input-border-color)
`;

export const FormEventDescription = styled.textarea`
padding: 8px 14px;
font-size:: 13.6px;
width:100%;
border:unset;
background-color:var(--form-input-bg-color);
color:var(--form-input-color);
outline:unset;
border-bottom: 1px solid var(--form-input-border-color);
resize:none;
height:60px;
`;

export const FormButton = styled.button`
border:unset;
background-color:var( --button-bg-color);
height:20px;

border-radius:4px;
color:var(--button-text-color);
cursor:pointer;

&:hover,:focus{
background-color:var( --button-bg-hover); 
}

&:not(:last-child){
margin-right:2px;
}
`;

export const FormButtonsWrapper=styled.div`
padding:8px 14px;
display:flex;
justify-content:flex-end;
`;
