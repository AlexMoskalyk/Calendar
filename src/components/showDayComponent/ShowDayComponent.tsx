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

  useEffect(() => {
    if (ref.current !== null) {
      setHeightEventItem(ref.current.clientHeight / HOURS_PER_DAY);
    }
  }, []);

  const onDragEndHandler = (
    e: React.DragEvent<HTMLDivElement>,
    event: IGlobalHoliday | IEvent
  ) => {
    console.log(e);
  };

  const onDropHandler = (e: React.DragEvent<HTMLLIElement>, i: number) => {
    e.preventDefault();
    console.log(i);
  };
  const onDragOverHandler = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const getTopPosition = (event: IEvent | IGlobalHoliday) => {
    return heightEventItem * +moment.unix(+event.date).format("H");
  };

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
  return (
    <ShowDayWrapper>
      <EventsWrapper>
        <ScaleWrapper ref={ref}>
          {cells.map((_, i) => (
            <ScaleCellWrapper
              key={i}
              onDrop={(e) => onDropHandler(e, i)}
              onDragOver={onDragOverHandler}
            >
              <ScaleCellTimeWrapper>
                {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
              </ScaleCellTimeWrapper>
              <ScaleCellEventWrapper />
            </ScaleCellWrapper>
          ))}
          {groupedArrayOfEvents.map((event: IGlobalHoliday | IEvent, i) => (
            <ScaleCellEventItemWrapper
              onDragEnd={(e) => onDragEndHandler(e, event)}
              draggable
              height={heightEventItem * +event.duration}
              width={eventWidth}
              key={event.id}
              top={getTopPosition(event)}
              left={32 + (eventWidth + 1) * i}
            >
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
