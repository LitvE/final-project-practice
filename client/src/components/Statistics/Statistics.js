import React from 'react';
import styles from './Statistics.module.sass';
import CONSTANTS from '../../constants';

function Statistics() {
  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.column}>
                <div className={styles.statItemContainer}>
                    <div className={styles.imgContainer}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`} alt='starts'/>
                    </div>
                    <p><span className={styles.spanStyle}>4.9 out of 5 stars</span> from
                    25,000+ customers.</p>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.statItemContainer}>
                    <div className={styles.imgContainer}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}img2(1).png`} alt='small_pictures'/>
                    </div>
                    <p>Our branding community stands <span className={styles.spanStyle}>200,000+</span> strong.</p>
                </div>
            </div>
            <div className={styles.column}>
                <div className={styles.statItemContainer}>
                    <div className={styles.imgContainer}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`} alt='files'/>
                    </div>
                    <p><span className={styles.spanStyle}>140+ Industries</span> supported across more than <span className={styles.spanStyle}>85 countries</span></p> 
                    <p>– and counting.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics