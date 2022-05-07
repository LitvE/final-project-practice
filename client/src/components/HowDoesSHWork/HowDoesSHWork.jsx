import React from 'react';
import CONSTANTS from '../../constants';
import styles from './HowDoesSHWork.module.sass'


function HowDoesSHWork() {
  return (
    <div className={styles.mainContainer} >
        <div className={styles.middleContainer}>
            <div className={styles.subContainer}>
            <div className={styles.articleContainer}>
                <p className={styles.btn_p}>World's #1 Naming Platform</p>
                <div className={styles.textContainer}>
                    <h1>How Does Squadhelp Work?</h1>
                    <p>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
                </div>
                <div className={styles.playBtn}>
                    <a className={styles.aStyle} href="https://vimeo.com/368584367">
                        <small class="fas fa-play mr-2"></small>
                        Play Video
                    </a>
                </div>
            </div>
            <div className={styles.iconContainer}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}image.svg`} alt='someone'/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default HowDoesSHWork