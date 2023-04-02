import styled from "styled-components";
import "../../styles/variables.css";

export const FormPositionWrapper = styled.div`
position:absolute;
z-index:100;
background-color:rgba(0,0,0,0.35);
top: 0;
right: 0;
bottom:0;
left:0;
display:flex;
align-items:center;
justify-content:center;
`;

export const FormWrapper = styled.form`
width:320px;
background-color:var(--form-bg-color);
color:var(--form-color);
border-top:1px solid #737374;
border-left:1px solid #464648;
border-right:1px solid #464648;
border-bottom:2px solid #737374;
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

