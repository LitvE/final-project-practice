import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import styles from './EventForm.module.sass';

function EventForm(props) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [warning, setWarning] = useState('');
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

  const clicked = (values) =>{
      const obj = {
          eventName: name,
          eventDate: date,
          eventTime: time,
          eventWarning: warning,
      };
      events.push(obj);

      localStorage.setItem('Events', JSON.stringify(events));

      setName('');
      setDate('');
      setTime('');
      setWarning('');
  };

  return (
    <div className={styles.formContainer}>
        <h1>INPUT NEW EVENT</h1>
        <Formik
            initialValues = {{
                name: '',
                date: '',
                time: '',
                warning: '',
            }}
            onSubmit = {clicked}
            resetForm
            >
            <Form className={styles.formStyle}>
                <label>Event Name:
                    <input className={styles.inputStyle} type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>Deadline Date:
                    <input className={styles.inputStyle} type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </label>
                <label>Deadline Time:
                    <input className={styles.inputStyle} type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                </label>
                <label>When inform (in minutes):
                    <input className={styles.inputStyle} type="text" name="warning" value={warning} onChange={(e) => setWarning(e.target.value)}/>
                </label>
                
                <button className={styles.btnStyle} type='submit'>SUBMIT</button>
            </Form>
        </Formik>
        <Link to="/events" className={styles.linkStyle}>BACK TO EVENTS</Link>
    </div>
  )
}

export default EventForm;