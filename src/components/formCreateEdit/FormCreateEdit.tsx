import React, { useState } from "react";
import {
  FormButton,
  FormButtonsWrapper,
  FormWrapper,
  FormEventTitle,
  FormEventDescription,
  SelectEventTimeWrapper,
  PositionRelative,
  ListOfHours,
  HoursButton,
  HolidayText
} from "./FormCreateEditStyled";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { ITEMS_PER_DAY } from "../../helpers/constants";
import moment from "moment";
import { isEventGlobalHoliday } from "../../helpers";

interface IFormCreateEdit {
  event: IEvent | IGlobalHoliday;
  closeCreateEditForm: ()=>void;
  submitCreateEditForm: (preparedEvent: IEvent)=>void;
  removeEventHandler: (eventId: string)=>void;
  operationMethod: string;
  certainDay: any;
}

function FormCreateEdit({
  removeEventHandler,
  certainDay,
  event,
  closeCreateEditForm,
  operationMethod,
  submitCreateEditForm,
}: IFormCreateEdit) {
  const initialState = {
    title: event ? event.title : "",
    description: event ? event.description : "",
    id: event.id ? event.id : "",
    date: event.date ? event.date : certainDay.format("X"),
  };

  const [state, setState] = useState(initialState);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const setTimeForEvent = (i: number) => {
    setShowTimePicker(false);
    const time = moment.unix(+state.date).hour(i).format("X");
    setState((prevState) => ({ ...prevState, date: time }));
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { title, description, date, id } = state;
    const preparedEvent = {
      id: id ? id : uuidv4(),
      title: title,
      description: description,
      date,
    };

    submitCreateEditForm(preparedEvent);
  };

  return (
    <FormWrapper>
      {
        isEventGlobalHoliday(event) ? 
        (<>
        <HolidayText>{event.title}</HolidayText>
        <HolidayText>{event.description}</HolidayText>
        <FormButtonsWrapper>
              <FormButton type="button" onClick={() => closeCreateEditForm()}>
                Cancel
              </FormButton>
        </FormButtonsWrapper>
        
        </>) 
        : 
        (<>
            <FormEventTitle
              placeholder="Title"
              type="text"
              name={"title"}
              onChange={handleChange}
              value={state.title}
            />
            <SelectEventTimeWrapper>
              <PositionRelative>
                <FormButton>
                  {moment.unix(+state?.date).format("dddd, D MMMM")}
                </FormButton>
                <FormButton onClick={() => setShowTimePicker(true)}>
                  {moment.unix(+state.date).format("HH")}:00
                </FormButton>
                {showTimePicker ? (
                  <ListOfHours>
                    {[...new Array(ITEMS_PER_DAY)].map((_, i) => (
                      <li key={i}>
                        <HoursButton onClick={() => setTimeForEvent(i)}>
                          {`${i}`.padStart(2, "0")}:00
                        </HoursButton>
                      </li>
                    ))}
                  </ListOfHours>
                ) : null}
              </PositionRelative>
            </SelectEventTimeWrapper>
            <FormEventDescription
              placeholder="Description"
              name={"description"}
              onChange={handleChange}
              value={state.description}
            />
            <FormButtonsWrapper>
              <FormButton type="button" onClick={() => closeCreateEditForm()}>
                Cancel
              </FormButton>
              <FormButton
                type="button"
                disabled={state.title ? false : true}
                onClick={handleSubmit}
              >
                {operationMethod}
              </FormButton>
              {operationMethod === "Edit" ? (
                <FormButton
                  type="button"
                  onClick={() => removeEventHandler(event?.id)}
                >
                  Remove
                </FormButton>
              ) : null}
            </FormButtonsWrapper>
          </>)
      }
    </FormWrapper>
  );
}

export default FormCreateEdit;
