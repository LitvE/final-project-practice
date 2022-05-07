import React from 'react';
import CONSTANTS from '../../constants';
import services from './services.json';
import styles from './OurServices.module.sass';

function OurServices() {
  return (
    <div className={styles.servicesContainer}>
        <div className={styles.divContainer}>
        <p className={styles.p1Style}>Our Services</p>
        <h2>3 Ways To Use Squadhelp</h2>
        <p className={styles.p2Style}>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
        </div>
        <div className={styles.cardDeck}>
            {services.map((service, i) => (
                <div key={i} className={styles.card}>
                    <div className={styles.cardBody}>
                        <div className={styles.cardTextBody}>
                            <img className={styles.iconStyle} src={`${CONSTANTS.STATIC_IMAGES_PATH}${service.image}`} alt={`${service.alt}`}/>
                            <h3>{service.h3}</h3>
                            <p>{service.p}</p>
                        </div>
                        <a className={styles.a_btn} href={`${service.aHerf}`}>{service.aText}</a>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default OurServices