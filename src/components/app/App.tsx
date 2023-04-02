import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../header/Header";
import Monitor from "../monitor/Monitor";
import Calendar from "../calendar/Calendar";
import { ShadowWrapper } from "./AppStyled";
import { IEvent } from "../../types/Interfaces";
import FormCreateEdit from "../formCreateEdit/FormCreateEdit";

const url = "http://localhost:5000";
const totalDays = 42;
window.moment = moment;

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [displayedDate, setDisplayedDate] = useState(moment());
  const [events, setEvents] = useState<IEvent[]>([]);
  const [event, setEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [operationMethod, setOperationMethod] = useState("");

  // const today = moment();
  // const endDay = moment().endOf('month').endOf('week');

  const startDay = displayedDate.clone().startOf("month").startOf("week");

  const startDayQuery = startDay.clone().format("X");
  const endDayQuery = startDay.clone().add(totalDays, "days").format("X");

  const prevHandler = () =>
    setDisplayedDate((prev) => prev.clone().subtract(1, "month"));
  const todayHandler = () => setDisplayedDate(moment());
  const nextHandler = () =>
    setDisplayedDate((prev) => prev.clone().add(1, "month"));
  // const toggleCreateEditForm = (value:boolean) => setShowForm(value);

  const openCreateEditForm = (method: "Edit" | "Create", eventForEdit: any) => {
    // console.log('Method',method)
    setShowForm(true);
    setEvent(eventForEdit);
    setOperationMethod(method);
  };

  const closeCreateEditForm = () => {
    setEvent(null);
    setShowForm(false);
  };

  const submitCreateEditForm = (preparedEvent:IEvent) => {
    const fetchUrl = operationMethod === 'Edit' ? `${url}/events/${preparedEvent.id}` : `${url}/events`;
    const httpMethod = operationMethod === 'Edit' ? 'PATCH' : 'POST';

    fetch(fetchUrl,{
      method:httpMethod,
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(preparedEvent)
    })
    .then(res=>res.json())
    .then(res =>{
      if (operationMethod === 'Edit') {
        setEvents(prevState=>prevState.map(eventItem => eventItem.id === res.id ? res : eventItem));
      }else {
        setEvents(prevState=>[...prevState,res] as IEvent[]);
      }
      
      closeCreateEditForm();
    })
  }

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("response", res);
        setEvents(res);
      });
  }, [startDayQuery, endDayQuery]);

  return (
    <>
      {showForm ? (
        <FormCreateEdit
        submitCreateEditForm={submitCreateEditForm}
          event={event}
          closeCreateEditForm={closeCreateEditForm}
          operationMethod={operationMethod}
        />
      ) : null}
      <ShadowWrapper>
        <Header />
        <Monitor
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          displayedDate={displayedDate}
        />
        <Calendar
          openCreateEditForm={openCreateEditForm}
          events={events}
          totalDays={totalDays}
          displayedDate={displayedDate}
          startDay={startDay}
        />
      </ShadowWrapper>
    </>
  );
}

export default App;
