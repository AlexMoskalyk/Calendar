import React , {useEffect, useState}from 'react';
import moment from 'moment';
import Header from '../header/Header';
import Monitor from '../monitor/Monitor';
import Calendar from '../calendar/Calendar';
import {ShadowWrapper} from './AppStyled';

function App() {
  moment.updateLocale('en', {week: {dow: 1}});

  const [displayedDate, setDisplayedDate] = useState(moment());
  
  
  
  
  // const today = moment();
// const endDay = moment().endOf('month').endOf('week');

const startDay = displayedDate.clone().startOf('month').startOf('week');

const prevHandler = () => setDisplayedDate(prev=>prev.clone().subtract(1,'month'));
const todayHandler = () => setDisplayedDate(moment());
const nextHandler = () => setDisplayedDate(prev=>prev.clone().add(1,'month'));


  return (
    <ShadowWrapper>
      <Header/>
      <Monitor
       prevHandler={prevHandler}
       todayHandler={todayHandler}
       nextHandler={nextHandler}
       displayedDate={displayedDate}/>
      <Calendar 
      displayedDate={displayedDate}
      startDay={startDay}/>
    </ShadowWrapper>
  );
}

export default App;
