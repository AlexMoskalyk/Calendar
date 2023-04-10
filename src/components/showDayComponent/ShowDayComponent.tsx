import React, { useEffect, useRef, useState } from "react";
import { isDayContainCurrentEvent, isEventGlobalHoliday } from "../../helpers";
import { IEvent, IGlobalHoliday } from "../../types/Interfaces";
import moment from "moment";
import { EventItemTittle } from "../../styledComponents/StyledComponents";
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
import {
  eventWidth,
  HOURS_PER_DAY,
  OPERATION_METHOD_CREATE,
  OPERATION_METHOD_EDIT,
} from "../../helpers/constants";

interface IShowDayComponent {
  events: IEvent[];
  displayedDate: moment.Moment;
  selectedEvent: IEvent;
  removeEventHandler: (id: string) => void;
  certainDay: moment.Moment;
  closeCreateEditForm: () => void;
  operationMethod: string;
  submitCreateEditForm: (event: IEvent) => void;
  openCreateEditForm: (
    method: string,
    eventForEdit: IEvent | null,
    day: string | moment.Moment
  ) => void;
  showForm: boolean;
  globalHolidays: IGlobalHoliday[];
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
  globalHolidays,
}: IShowDayComponent) {

const [heightEventItem, setHeightEventItem] = useState(0);
const ref = useRef<HTMLUListElement>(null);

useEffect(()=>{
  if(ref.current !== null){
    setHeightEventItem(ref.current.clientHeight / HOURS_PER_DAY);
       
  }
  
},[])




const getTopPosition = (event:IEvent | IGlobalHoliday) => {
  return heightEventItem * +moment.unix(+event.date).format('H');
}

  const filtredEventList = events.filter((event) => {
    const result = isDayContainCurrentEvent(event, displayedDate);
    return result;
  });

  const filtredGlobalHolidays = globalHolidays.filter((item: any) => {
    const result = isDayContainCurrentEvent(item, displayedDate);
    return result;
  });

  const groupedArrayOfEvents = [...filtredEventList, ...filtredGlobalHolidays];

  const cells = [...new Array(HOURS_PER_DAY)];

  // .map((_, i) => {
  // const formattedEventArray: IEvent[]  = [];
  // const formattedGlobalHolidayArray: IGlobalHoliday[]  = [];

  // filtredEventList.forEach((event) => {
  //   if (+moment.unix(+event.date).format('H') === i) {
  //     formattedEventArray.push(event);
  //   }
  // });
  // filtredGlobalHolidays.forEach((item:any) => {
  //   if (+moment.unix(+item.date).format('H') === i) {
  //     formattedGlobalHolidayArray.push(item);
  //   }
  // });

  // const result = [...formattedEventArray,...formattedGlobalHolidayArray];
  // return result;
  // });

  return (
    <ShowDayWrapper>
      <EventsWrapper>
        <ScaleWrapper ref={ref}>
          {cells.map((_, i) => (
            <ScaleCellWrapper key={i}>
              <ScaleCellTimeWrapper>
                {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
              </ScaleCellTimeWrapper>
              <ScaleCellEventWrapper />
              
            </ScaleCellWrapper>
          ))}
          {groupedArrayOfEvents.map((event: IGlobalHoliday | IEvent, i) => (
                <ScaleCellEventItemWrapper 
                height={heightEventItem * +event.duration}
                width={eventWidth} 
                key={event.id} 
                top={getTopPosition(event)}
                left={32 + (eventWidth + 1)*i}>
                  <EventItemTittle
                    globalHoloday={isEventGlobalHoliday(event) ? true : false}
                    onClick={() =>
                      openCreateEditForm(OPERATION_METHOD_EDIT, event, "")
                    }
                  >
                    {event.title}
                  </EventItemTittle>
                </ScaleCellEventItemWrapper>
              ))}
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
            <CreateButtonWrapper
              onClick={() =>
                openCreateEditForm(OPERATION_METHOD_CREATE, null, displayedDate)
              }
            >
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

