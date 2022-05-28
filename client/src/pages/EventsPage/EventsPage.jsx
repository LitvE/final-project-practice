import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import EventsList from '../../components/Events/EventsList/EventsList';
import styles from './EventsPage.module.sass';


function EventsPage() {
  const [events, setEvents] = useState([]);

  const loadEvents = () => {
    const bufferArray = JSON.parse(localStorage.getItem('Events'));
    if(!bufferArray){
      return events;
    }
    setEvents(bufferArray);
  }

  useEffect(()=>{
    loadEvents();
  },[]);

  return (
    <div className={styles.container}>
        <EventsList events={events} />
        <Link to="/events/form">ADD NEW EVENT</Link>
    </div>
  )
}

export default EventsPage;