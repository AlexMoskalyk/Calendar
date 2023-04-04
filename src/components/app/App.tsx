import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../header/Header";
import Monitor from "../monitor/Monitor";
import Calendar from "../calendar/Calendar";

import { IEvent } from "../../types/Interfaces";
import FormCreateEdit from "../formCreateEdit/FormCreateEdit";
import {
  DISPLAYED_MODE_DAY,
  DISPLAYED_MODE_MONTH,
} from "../../helpers/constants";
import ShowDayComponent from "../showDayComponent/ShowDayComponent";
import { ShadowWrapper } from "../../styledComponents/StyledComponents";
import Modal from "../modal/Modal";

const url = "http://localhost:5000";
const totalDays = 42;
window.moment = moment;

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [displayedDate, setDisplayedDate] = useState(moment());
  const [displayedMode, setDisplayedMode] = useState(DISPLAYED_MODE_MONTH);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [operationMethod, setOperationMethod] = useState("");
  const [certainDay, setCertainDay] = useState("");

  // const today = moment();
  // const endDay = moment().endOf('month').endOf('week');

  const startDay = displayedDate.clone().startOf("month").startOf("week");

  const startDayQuery = startDay.clone().format("X");
  const endDayQuery = startDay.clone().add(totalDays, "days").format("X");

  const prevHandler = () =>
    setDisplayedDate((prev) =>
      prev.clone().subtract(1, displayedMode === "month" ? "month" : "day")
    );

  const todayHandler = () => setDisplayedDate(moment());

  const nextHandler = () =>
    setDisplayedDate((prev) =>
      prev.clone().add(1, displayedMode === "month" ? "month" : "day")
    );

  const toggleCreateEditFormInModal = (value:boolean) => setShowModal(value);

  const toggleForm = (value:boolean) => setShowForm(value);

  const openCreateEditForm = (
    method:string ,
    eventForEdit: IEvent,
    day: string
  ) => {
    setOperationMethod(method);
    setEvent(eventForEdit);
    setCertainDay(day);
    toggleForm(true);
  };

  const openCreateEditFormInModal = (
    method:string ,
    eventForEdit: IEvent,
    day: string
  ) => {
    openCreateEditForm(method,eventForEdit,day);
    toggleCreateEditFormInModal(true);
  };

  const closeCreateEditForm = () => {
    setEvent(null);
    setCertainDay("");
    toggleCreateEditFormInModal(false); 
    toggleForm(false);
  };

  const openDayMode = (mode:string, date:any) => {

    setDisplayedMode(mode);
    setDisplayedDate(date)
  }



  const submitCreateEditForm = (preparedEvent: IEvent) => {
    const fetchUrl =
      operationMethod === "Edit"
        ? `${url}/events/${preparedEvent.id}`
        : `${url}/events`;
    const httpMethod = operationMethod === "Edit" ? "PATCH" : "POST";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedEvent),
    })
      .then((res) => res.json())
      .then((res) => {
        if (operationMethod === "Edit") {
          setEvents((prevState) =>
            prevState.map((eventItem) =>
              eventItem.id === res.id ? res : eventItem
            )
          );
        } else {
          setEvents((prevState) => [...prevState, res] as IEvent[]);
        }

        closeCreateEditForm();
      });
  };



  const removeEventHandler = (eventId: any) => {
    const fetchUrl = `${url}/events/${eventId}`;
    const httpMethod = "DELETE";
    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setEvents((prevState) =>
          prevState.filter((eventItem) => eventItem.id !== eventId)
        );

        closeCreateEditForm();
      });
  };

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }, [startDayQuery, endDayQuery]);

  return (
    <>
      {showModal ? (
        <Modal closeCreateEditForm={closeCreateEditForm}>
          <FormCreateEdit
            removeEventHandler={removeEventHandler}
            certainDay={certainDay}
            submitCreateEditForm={submitCreateEditForm}
            event={event}
            closeCreateEditForm={closeCreateEditForm}
            operationMethod={operationMethod}
          />
        </Modal>
      ) : null}
      <ShadowWrapper>
        <Header />
        <Monitor
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          displayedDate={displayedDate}
          setDisplayedMode={setDisplayedMode}
          displayedMode={displayedMode}
        />
        {displayedMode === DISPLAYED_MODE_MONTH ? (
          <Calendar
          openDayMode={openDayMode}
            setDisplayedMode={setDisplayedMode}
            openCreateEditForm={openCreateEditFormInModal}
            events={events}
            totalDays={totalDays}
            displayedDate={displayedDate}
            startDay={startDay}
          />
        ) : null}

        {displayedMode === DISPLAYED_MODE_DAY ? (
          <ShowDayComponent
          showForm={showForm}
          openCreateEditForm={openCreateEditForm}
            events={events}
            displayedDate={displayedDate}
            selectedEvent={event}
            removeEventHandler={removeEventHandler}
            certainDay={certainDay}
            submitCreateEditForm={submitCreateEditForm}
            closeCreateEditForm={closeCreateEditForm}
            operationMethod={operationMethod}
          />
        ) : null}
      </ShadowWrapper>
    </>
  );
}

export default App;
