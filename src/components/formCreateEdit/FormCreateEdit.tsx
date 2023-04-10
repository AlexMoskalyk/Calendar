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
  HolidayText,
  DatePickerWrapper
} from "./FormCreateEditStyled";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";
import { v4 as uuidv4 } from "uuid";
import { HOURS_PER_DAY } from "../../helpers/constants";
import moment from "moment";
import { isEventGlobalHoliday } from "../../helpers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers";

interface IFormCreateEdit {
  event: IEvent | IGlobalHoliday;
  closeCreateEditForm: () => void;
  submitCreateEditForm: (preparedEvent: IEvent) => void;
  removeEventHandler: (eventId: string) => void;
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
    time: event.date ? event.date : certainDay.format("X"),
    day: event.date ? event.date : certainDay.format("X"),
    duration: event.duration ? event.duration : "1",
  };

  const [state, setState] = useState(initialState);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    const time = moment.unix(+state.time).hour(i).format('X');
    setState((prevState) => ({ ...prevState, time: time }));
  };

  const setDurationForEvent = (i: number) => {
    setShowDurationPicker(false);
    const durationTime = i.toString();
    setState((prevState) => ({ ...prevState, duration: durationTime }));
  };

  const setDayForEvent = (value:any) => {
    setShowDatePicker(false);
    const formatedValue = moment(value).format('X');
    setState((prevState) => ({ ...prevState, day: formatedValue }));
    }

   function prepareDate(day: number, time: number) {
    // Combine the day and time into a single moment object
    const dateTime = moment.unix(day).hour(moment.unix(time).hour()).minute(moment.unix(time).minute()).format('X');
  
    return dateTime;
  }

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const { title, description, time, day, id, duration } = state;

    const dateInMilliseconds = prepareDate(day, time).toString();

    
    const preparedEvent = {
      id: id ? id : uuidv4(),
      title,
      description,
      duration,
      date:dateInMilliseconds,

    };

    
    
    submitCreateEditForm(preparedEvent);
  };

  return (
    <FormWrapper>
      {isEventGlobalHoliday(event) ? (
        <>
          <HolidayText>{event.title}</HolidayText>
          <HolidayText>{event.description}</HolidayText>
          <FormButtonsWrapper>
            <FormButton type="button" onClick={() => closeCreateEditForm()}>
              Cancel
            </FormButton>
          </FormButtonsWrapper>
        </>
      ) : (
        <>
          <FormEventTitle
            placeholder="Title"
            type="text"
            name={"title"}
            onChange={handleChange}
            value={state.title}
          />
          <SelectEventTimeWrapper>
            <PositionRelative>
              <FormButton onClick={()=>setShowDatePicker(true)}>
                {moment.unix(+state?.day).format("dddd, D MMMM")}
              </FormButton>
              <FormButton onClick={() => setShowTimePicker(true)}>
                Start:{moment.unix(+state.time).format("HH")}:00
              </FormButton>

              <FormButton onClick={() => setShowDurationPicker(true)}>
                Duration:{state.duration}:00
              </FormButton>

              {showTimePicker ? (
                <ListOfHours leftPosition={"118px"}>
                  {[...new Array(HOURS_PER_DAY)].map((_, i) => (
                    <li key={i}>
                      <HoursButton onClick={() => setTimeForEvent(i)}>
                        {`${i}`.padStart(2, "0")}:00
                      </HoursButton>
                    </li>
                  ))}
                </ListOfHours>
              ) : null}

              {showDurationPicker ? (
                <ListOfHours leftPosition={"210px"}>
                  {[...new Array(HOURS_PER_DAY)].map((_, i) => (
                    <li key={i}>
                      <HoursButton onClick={() => setDurationForEvent(i + 1)}>
                        {`${i + 1}`.padStart(2, "0")}:00
                      </HoursButton>
                    </li>
                  ))}
                </ListOfHours>
              ) : null}

              {showDatePicker ? (
                <DatePickerWrapper>
                  <DemoContainer components={["DateCalendar"]}>
                    <DemoItem>
                      <DateCalendar defaultValue={moment()}  onChange={(newValue) => setDayForEvent(newValue)}/>
                    </DemoItem>
                  </DemoContainer>
                </DatePickerWrapper>
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
        </>
      )}
    </FormWrapper>
  );
}

export default FormCreateEdit;
