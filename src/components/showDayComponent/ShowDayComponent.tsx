import React from "react";
import { isDayContainCurrentEvent, isEventGlobalHoliday } from "../../helpers";
import { IEvent,IGlobalHoliday } from "../../types/Interfaces";
import moment from 'moment';
import {
  EventItemTittle,
  } from "../../styledComponents/StyledComponents";
import {
  CreateButtonWrapper,
  EventFormWrapper,
  EventsWrapper,
  NoEventMsg,
  ScaleCellEventItemWrapper,
  ScaleCellEventWrapper,
  ScaleCellTimeWrapper,
  ScaleCellWrapper,
  ScaleWrapper,
  ShowDayWrapper,
} from "./ShowDayComponentStyled";
import FormCreateEdit from "../formCreateEdit/FormCreateEdit";
import { HOURS_PER_DAY, OPERATION_METHOD_CREATE, OPERATION_METHOD_EDIT } from "../../helpers/constants";

interface IShowDayComponent {
  events: IEvent[] ;
  displayedDate:moment.Moment;
  selectedEvent: IEvent;
  removeEventHandler:(id:string)=>void;
  certainDay:moment.Moment;
  closeCreateEditForm:()=>void;
  operationMethod:string;
  submitCreateEditForm:(event:IEvent)=>void;
  openCreateEditForm:
  (method: string,
  eventForEdit: IEvent | null,
  day: string | moment.Moment
) => void,
  showForm:boolean;
  globalHolidays:IGlobalHoliday[];
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
  globalHolidays
  }: IShowDayComponent) {

  const filtredEventList = events.filter((event) =>{
   const result = isDayContainCurrentEvent(event, displayedDate);
   return result
  });

  const filtredGlobalHolidays = globalHolidays.filter((item:any)=>{
   const result = isDayContainCurrentEvent(item,displayedDate);
   return result
  })


  const cells = [...new Array(HOURS_PER_DAY)].map((_, i) => {
    const formattedEventArray: IEvent[]  = [];
    const formattedGlobalHolidayArray: IGlobalHoliday[]  = [];
    

    filtredEventList.forEach((event) => {
      if (+moment.unix(+event.date).format('H') === i) {
        formattedEventArray.push(event);
      }
    });
    filtredGlobalHolidays.forEach((item:any) => {
      if (+moment.unix(+item.date).format('H') === i) {
        formattedGlobalHolidayArray.push(item);
      }
    });

    const result = [...formattedEventArray,...formattedGlobalHolidayArray];
    return result;
  });


  return (
    <ShowDayWrapper>
      <EventsWrapper>
        <ScaleWrapper>
        {
          cells.map((eventList,i)=>(
            <ScaleCellWrapper key={i}>
              <ScaleCellTimeWrapper >
                {
                  i ? (<>
                  {`${i}`.padStart(2,'0')}:00
                  </>) : null
                }
                </ScaleCellTimeWrapper>
              <ScaleCellEventWrapper>
                {
                  eventList.map((event: IGlobalHoliday | IEvent)=>(
                    <ScaleCellEventItemWrapper key={event.id}>
                      <EventItemTittle globalHoloday={isEventGlobalHoliday(event) ? true :false} onClick={() => openCreateEditForm(OPERATION_METHOD_EDIT,event,'')}>
                      { event.title }
                      </EventItemTittle>
                    </ScaleCellEventItemWrapper>
                  ))
                }
                  </ScaleCellEventWrapper>
            </ScaleCellWrapper>
          ))
        }
        </ScaleWrapper>
        
      </EventsWrapper>
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
          <CreateButtonWrapper onClick={()=>openCreateEditForm(OPERATION_METHOD_CREATE,null,displayedDate)}>
            Create
          </CreateButtonWrapper>
          <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </ShowDayWrapper>
  );
}

export default ShowDayComponent;
