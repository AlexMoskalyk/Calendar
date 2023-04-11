import React, { useEffect, useState } from "react";
import moment from "moment";
import Header from "../header/Header";
import Monitor from "../monitor/Monitor";
import Calendar from "../calendar/Calendar";
import { v4 as uuidv4 } from "uuid";
import { IEvent,IGlobalHoliday } from "../../types/Interfaces";
import FormCreateEdit from "../formCreateEdit/FormCreateEdit";
import {
  DISPLAYED_MODE_DAY,
  DISPLAYED_MODE_MONTH,
  } from "../../helpers/constants";
import ShowDayComponent from "../showDayComponent/ShowDayComponent";
import { ShadowWrapper } from "../../styledComponents/StyledComponents";
import Modal from "../modal/Modal";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'


const url = "https://calendar-server-omoskalyk.herokuapp.com";
const globalHolidaysUrl = "https://date.nager.at/api/v3/publicholidays";
const totalDays = 42;
const countryCode = "UA";
window.moment = moment;

const initialEvent = {
  id: "",
  title: "",
  description: "",
  date: "",
  duration: "",
};

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [displayedDate, setDisplayedDate] = useState<moment.Moment>(moment());
  const [displayedMode, setDisplayedMode] = useState<string>(DISPLAYED_MODE_MONTH);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [event, setEvent] = useState<IEvent>(initialEvent);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [operationMethod, setOperationMethod] = useState<string>("");
  const [certainDay, setCertainDay] = useState<any>("");
  const [globalHolidays, setGlobalHolidays] = useState<IGlobalHoliday[]>([]);

  const currentYear = moment().format("YYYY");

  const startDay = displayedDate.clone().startOf("month").startOf("week");

  const startDayQuery = startDay.clone().format("X");

  const endDayQuery = startDay.clone().add(totalDays, "days").format("X");

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      }).catch((error)=>console.log(error));

    fetch(`${globalHolidaysUrl}/${currentYear}/${countryCode}`)
      .then((res) => res.json())
      .then((res) => {
        const formattedRes = res.map((item: any) => {
          const timeStamp = moment(item.date).unix().toString();

          const result = {
            title: item.name,
            id: uuidv4(),
            description: item.localName,
            date: timeStamp,
            globalHoliday:true,
            duration:'24'
          };

          return result;
        });
        
        setGlobalHolidays(formattedRes);
      }).catch((error)=>console.log(error));
  }, [startDayQuery, endDayQuery, currentYear]);

  const prevHandler = ():void =>
    setDisplayedDate((prev:moment.Moment) =>
      prev.clone().subtract(1, displayedMode === "month" ? "month" : "day")
    );


  const todayHandler = ():void => setDisplayedDate(moment());

  const nextHandler = ():void =>
    setDisplayedDate((prev:moment.Moment) =>
      prev.clone().add(1, displayedMode === "month" ? "month" : "day")
    );

  const toggleCreateEditFormInModal = (value: boolean):void => setShowModal(value);

  const toggleForm = (value: boolean):void => setShowForm(value);

  const openCreateEditForm = (
    method: string,
    eventForEdit: IEvent | null,
    day: string |  moment.Moment
  ):void => {
    setOperationMethod(method);
    if (eventForEdit) {
      setEvent(eventForEdit);
    }
    setCertainDay(day);
    toggleForm(true);
  };

  const openCreateEditFormInModal = (
    method: string,
    eventForEdit: IEvent | null,
    day: string | moment.Moment
  ):void => {
    openCreateEditForm(method, eventForEdit, day);
    toggleCreateEditFormInModal(true);
  };

  const closeCreateEditForm = ():void => {
    setEvent(initialEvent);
    setCertainDay("");
    toggleCreateEditFormInModal(false);
    toggleForm(false);
  };

  const openDayMode = (mode: string, date: moment.Moment) => {
    setDisplayedMode(mode);
    setDisplayedDate(date);
  };

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

       
      })
      .catch((error)=>console.log(error));
      closeCreateEditForm();
  };


  const updateEventAfterDrop = (preparedEvent: IEvent) => {
    const fetchUrl = `${url}/events/${preparedEvent.id}`
      
    const httpMethod = "PATCH" ;

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedEvent),
    })
      .then((res) => res.json())
      .then((res) => {
        setEvents((prevState) =>
            prevState.map((eventItem) =>
              eventItem.id === res.id ? res : eventItem
            )
          );

       
      })
      .catch((error)=>console.log(error));
      };

  const removeEventHandler = (eventId: string) => {
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

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {showModal ? (
        <Modal closeModal={closeCreateEditForm}>
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
          updateEventAfterDrop={updateEventAfterDrop}
            globalHolidays={globalHolidays}
            openDayMode={openDayMode}
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
            globalHolidays={globalHolidays}
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
      
    </LocalizationProvider>
  );
}

export default App;
