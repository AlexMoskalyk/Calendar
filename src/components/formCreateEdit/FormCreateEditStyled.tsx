import styled from "styled-components";
import "../../styles/variables.css";
import { ButtonWrapper, ShadowWrapper } from "../../styledComponents/StyledComponents";

type FormButtonProps = {
  disabled? :boolean,
}

export const FormPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled(ShadowWrapper)`
width: 320px;
min-width: 320px;
height: 100%;
background-color:var(--form-bg-color);
color:var(--form-color);
box-shadow:unset;
border-radius:8px;
overflow: hidden;
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

export const FormButton = styled.button<FormButtonProps>`
border:unset;
background-color:var( --button-bg-color);
height:20px;

border-radius:4px;
color:var(--button-text-color);
cursor:${props=>props.disabled ? 'not-allowed' : 'pointer'};

&:hover,:focus{
background-color:${props=>props.disabled ? 'null' : 'var( --button-bg-hover)'};
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


export const SelectEventTimeWrapper = styled('div')`
  padding: 8px 14px;
  border-bottom: 1px solid #464648;
  display: flex;
`;


export const PositionRelative = styled('div')`
  position: relative;
`;


export const ListOfHours = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 2px;
  background-color: var(--form-input-border-color);
`;

export const HoursButton = styled(ButtonWrapper)`
  border: none;
  background-color: unset;
  cursor: pointer;
`;

export const HolidayText = styled.span`
padding: 8px 14px;
font-size:: 13.6px;
width:100%;
border:unset;
background-color:var(--form-input-bg-color);
color:var(--form-input-color);
outline:unset;
border-bottom: 1px solid var(--form-input-border-color)
`;



