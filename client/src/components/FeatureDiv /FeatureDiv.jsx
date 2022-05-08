import React from 'react';
import CONSTANTS from '../../constants';
import styles from './FeatureDiv.module.sass';

function FeatureDiv() {
  return (
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.col_1}>
                <div className={styles.pl}>
                    <h6>Featured In</h6>
                </div>
            </div>
            <div className={styles.col_2}>
                <div className={styles.clientsSectionContainer}>
                    <div className={styles.clientsSectionItem}>
                        <div className={styles.clientLogoDiv}>
                            <a href="http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199" target="_blank" rel="noreferrer">
                                <img className={styles.clientLogo} src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/forbes.svg`} alt="Forbes"/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.clientsSectionItem}>
                        <div className={styles.clientLogoDiv}>
                            <a href="http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/" target="_blank" rel="noreferrer">
                                <img className={styles.clientLogo} src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/TNW.svg`} alt="TNW"/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.clientsSectionItem}>
                        <div className={styles.clientLogoDiv}>
                            <a href="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html" target="_blank" rel="noreferrer">
                                <img className={styles.clientLogo} src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/chicago.svg`} alt="Chicago"/>
                            </a>
                        </div>
                    </div>
                    <div className={styles.clientsSectionItem}>
                        <div className={styles.clientLogoDiv}>
                            <a href="http://mashable.com/2011/04/01/make-money-crowdworking/" target="_blank" rel="noreferrer">
                                <img className={styles.clientLogo} src={`${CONSTANTS.STATIC_IMAGES_PATH}/sponsors/Mashable.svg`} alt="Mashable"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeatureDiv