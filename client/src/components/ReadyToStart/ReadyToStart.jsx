import React from 'react';
import CONSTANTS from '../../constants';
import styles from './ReadyToStart.module.sass'

function ReadyToStart() {
  return (
    <div className={styles.readyToStartContainer}>
        <div className={styles.contentContainer}>
            <h3>Ready to get started?</h3>
            <p>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
            <a href="/start-contest">Start A Contest</a>
        </div>
        <div className={styles.imgContainer_1}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/leftUpperAbstraction.svg`} alt="abstraction"/>
        </div>
        <div className={styles.imgContainer_2}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}/rightBottomFlower.svg`} alt="abstraction"/>
        </div>
    </div>
  )
}

export default ReadyToStart