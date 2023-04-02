import React, {useState} from 'react';
import {FormButton,FormButtonsWrapper,FormPositionWrapper,FormWrapper,FormEventTitle,FormEventDescription} from './FormCreateEditStyled';
import {IEvent} from '../../types/Interfaces';
import moment from 'moment';

interface IFormCreateEdit {
    event:IEvent | null,
    closeCreateEditForm:any,
    operationMethod:string,
}

function FormCreateEdit({event,closeCreateEditForm,operationMethod}:IFormCreateEdit) {
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

  return (
    <FormPositionWrapper onClick={()=>closeCreateEditForm(false)}>
        <FormWrapper onClick={e=>e.stopPropagation()}>
            <FormEventTitle name={'title'} onChange={handleChange} value={state.title}/>
            <FormEventDescription name={'description'}  onChange={handleChange} value={state.description}/>
            <FormButtonsWrapper>
                <FormButton onClick={()=>closeCreateEditForm(false)}>Cancel</FormButton>
                <FormButton>{operationMethod}</FormButton>
            </FormButtonsWrapper>
        </FormWrapper>
    </FormPositionWrapper>
  )
}

export default FormCreateEdit