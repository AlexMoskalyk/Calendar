import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import { IEvent } from "../../types/Interfaces";
import {
  ButtonWrapper,
  EventItemTittle,
  EventItemWrapper,
  EventListWrapper,
} from "../../styledComponents/StyledComponents";
import {
  EventFormWrapper,
  NoEventMsg,
  ShowDayWrapper,
} from "./ShowDayComponentStyled";
import FormCreateEdit from "../formCreateEdit/FormCreateEdit";
import { OPERATION_METHOD_CREATE, OPERATION_METHOD_EDIT } from "../../helpers/constants";

interface IShowDayComponent {
  events: IEvent[];
  displayedDate: any;
  selectedEvent: IEvent | null;
  removeEventHandler:any;
  certainDay:any;
  closeCreateEditForm:any;
  operationMethod:string;
  submitCreateEditForm:any;
  openCreateEditForm:any;
  showForm:boolean;
 }

function ShowDayComponent({
  events,
  displayedDate,
  selectedEvent,
  removeEventHandler,
  certainDay,
  closeCreateEditForm,
  operationMethod,
  submitCreateEditForm,
  openCreateEditForm,
  showForm,
  }: IShowDayComponent) {
  const filtredEventList = events.filter((event) =>
    isDayContainCurrentEvent(event, displayedDate)
  );
  return (
    <ShowDayWrapper>
      <EventListWrapper>
        {filtredEventList.map((event) => (
          <EventItemWrapper key={event.id}>
            <EventItemTittle onClick={() => openCreateEditForm(OPERATION_METHOD_EDIT,event,null)}>
              {event.title}
            </EventItemTittle>
          </EventItemWrapper>
        ))}
      </EventListWrapper>
      <EventFormWrapper>
        {showForm ? (
          <div>
            <FormCreateEdit
              removeEventHandler={removeEventHandler}
              certainDay={certainDay}
              event={selectedEvent}
              closeCreateEditForm={closeCreateEditForm}
              operationMethod={operationMethod}
              submitCreateEditForm={submitCreateEditForm}
            />
          </div>
        ) : (
          <>
          <ButtonWrapper onClick={()=>openCreateEditForm(OPERATION_METHOD_CREATE,null,displayedDate)}>
            Create
          </ButtonWrapper>
          <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </ShowDayWrapper>
  );
}

export default ShowDayComponent;

{
  /*            
            <FormEventTitle
              placeholder="Title"
              type="text"
              name={"title"}
              onChange={handleChange}
              value={state.title}
            />
            <FormEventDescription
              placeholder="Description"
              name={"description"}
              onChange={handleChange}
              value={state.description}
            />
            <FormButtonsWrapper>
              <FormButton
                type="button"
                onClick={() => closeCreateEditForm(false)}
              >
                Cancel
              </FormButton>
              <FormButton type="submit" onClick={handleSubmit}>
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
            </FormButtonsWrapper> */
}
