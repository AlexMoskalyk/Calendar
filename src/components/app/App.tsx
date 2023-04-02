import React , {useEffect, useState}from 'react';
import moment from 'moment';
import Header from '../header/Header';
import Monitor from '../monitor/Monitor';
import Calendar from '../calendar/Calendar';
import {ShadowWrapper} from './AppStyled';

const url = 'http://localhost:5000';
const totalDays = 42;
window.moment = moment;

function App() {
  moment.updateLocale('en', {week: {dow: 1}});
 

  const [displayedDate, setDisplayedDate] = useState(moment());
  const [events, setEvents] = useState([]);
  
// const today = moment();
// const endDay = moment().endOf('month').endOf('week');


const startDay = displayedDate.clone().startOf('month').startOf('week');

const startDayQuery = startDay.clone().format('X');
const endDayQuery = startDay.clone().add(totalDays,'days').format('X')

const prevHandler = () => setDisplayedDate(prev=>prev.clone().subtract(1,'month'));
const todayHandler = () => setDisplayedDate(moment());
const nextHandler = () => setDisplayedDate(prev=>prev.clone().add(1,'month'));

useEffect(()=>{
  fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
  .then(res=>res.json())
  .then(res=>{console.log('response', res)
  setEvents(res);
})
},[startDayQuery,endDayQuery])

  return (
    <ShadowWrapper>
      <Header/>
      <Monitor
       prevHandler={prevHandler}
       todayHandler={todayHandler}
       nextHandler={nextHandler}
       displayedDate={displayedDate}/>
      <Calendar 
      events={events}
      totalDays={totalDays}
      displayedDate={displayedDate}
      startDay={startDay}/>
    </ShadowWrapper>
  );
}

export default App;
