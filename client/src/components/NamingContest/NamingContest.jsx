import React from 'react';
import CONSTANTS from '../../constants';
import steps from './steps.json'
import styles from './NamingContest.module.sass';

function NamingContest() {
  return (
    <div className={styles.nameContestContainer}>
        <div className={styles.headlineDivStyle}>
            <img className={styles.gobletIconStyle} src={`${CONSTANTS.STATIC_IMAGES_PATH}gobletIcon.svg`} alt='gobletIcon'/>
            <h2>How Do Naming Contests Work?</h2>
        </div>
        <div className={styles.mainlListContainer}>
        <div className={styles.listDivStyle}>
            <ul>
                {steps.map((s, i) => (
                    <li key={i}>
                        <div className={styles.liDivStyle}>
                            <div className={styles.numDivStyle}>
                                <span>{s.count}</span>
                            </div>
                            <div className={styles.textDivStyle}>
                                <p>{s.step}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className={styles.imageMainContainer}>
            <div className={styles.imageSubContainer}>
            <img className={styles.imageStyle} src={`${CONSTANTS.STATIC_IMAGES_PATH}image2.svg`} alt='person'/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default NamingContest