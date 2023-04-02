import React, {useState} from 'react';
import {FormButton,FormButtonsWrapper,FormPositionWrapper,FormWrapper,FormEventTitle,FormEventDescription} from './FormCreateEditStyled';
import {IEvent} from '../../types/Interfaces';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

interface IFormCreateEdit {
    event:IEvent | null,
    closeCreateEditForm:any,
    submitCreateEditForm:any,
    operationMethod:string,
}

function FormCreateEdit({event,closeCreateEditForm,operationMethod,submitCreateEditForm}:IFormCreateEdit) {
const initialState = {
    title: event ? event.title : '',
    description:event ? event.description : '',
    id:event ? event.id : '',
    date:event ? event.date : moment().format('X'),
}

const [state, setState] = useState(initialState);


const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value,name} = e.target;
    setState(prevState => ({...prevState, [name]:value}))
}

const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const {title,description,date,id} = state;
    const preparedEvent = {
        id: id ? id : uuidv4(),
        title:title,
        description:description,
        date
    }

   submitCreateEditForm(preparedEvent);
 }


 

  return (
    <FormPositionWrapper onClick={()=>closeCreateEditForm(false)}>
        <FormWrapper onClick={e=>e.stopPropagation()}>
            <FormEventTitle type='text' name={'title'} onChange={handleChange} value={state.title}/>
            <FormEventDescription type='text' name={'description'}  onChange={handleChange} value={state.description}/>
            <FormButtonsWrapper>
                <FormButton type='button' onClick={()=>closeCreateEditForm(false)}>Cancel</FormButton>
                <FormButton type='submit' onClick={handleSubmit}>{operationMethod}</FormButton>
            </FormButtonsWrapper>
        </FormWrapper>
    </FormPositionWrapper>
  )
}

export default FormCreateEdit