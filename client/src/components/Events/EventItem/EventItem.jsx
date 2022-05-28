import React, { Component } from 'react';
import CountDown from '../CountDown/CountDown';
import styles from './EventItem.module.sass';

export default class EventItem extends Component {

  render() {
    const {event, index, length} = this.props;

    const flexStyle = {
      flexGrow: (index/length),
    };

    return (
      <div className={styles.itemContainer}>
          <div className={styles.eventNameDivStyle}>
            <div>{event.eventName}</div>
          </div>
          <div style={flexStyle} className={styles.eventTimerDivStyle}>
            <CountDown data={event}/>
          </div> 
      </div>
    )
  }
}
