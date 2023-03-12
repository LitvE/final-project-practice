import React from 'react';
import { useState } from "react";
import EventItem from '../EventItem/EventItem';
import styles from './EventsList.module.sass';

function EventsList(props) {
  const {events} = props;
  const [count, setCount] = useState(0);
  
  const countChange = () => {
    setCount(count+1);
  };

  events.sort(function(a, b){
    return new Date(a.eventDate + 'T' + a.eventTime).getTime() - new Date(b.eventDate + 'T' + b.eventTime).getTime();
  });

  return (
    <div>
      { count ? 
        <div className={styles.messageContainer}>
          {count}
          <i className="fa fa-comment iMassage" aria-hidden="true"></i>
        </div> 
        : 
        <div></div>}
        <div className={styles.headerStyle}>
          <div><h1>Live upcomming checks</h1></div>
          <div><h5>Remaining time</h5></div>
        </div>
        <ul className={styles.ulStyle}>
            {events.map((event, index) => {
              return (
                <li key={index} className={styles.liStyle}>
                    <EventItem event={event} index={index} length={events.length} countChange={countChange}/>
                </li>
              )    
            })}
        </ul>
    </div>
  )
}

export default EventsList