import React from 'react';
import benefits from './benefits.json'
import CONSTANTS from '../../constants';
import styles from './BenefitsAndQuestions.module.sass'


function BenefitsAndQuestions() {
    const scheduleConsultationClick = () =>{};
    return (
        <div className={styles.container}>
            <div className={styles.col1}>
                <ul>
                    {benefits.map((benefit, i) => (
                    <li key={i}>
                        <span className={styles.angleContainer}>
                            <span className={styles.angleInner}><i className="fas fa-angle-right"></i></span>
                        </span>
                        <div className={styles.benDiv}>
                            <h3>{benefit.header}</h3>
                            <p>{benefit.body} {i === 1 && (<span><a className={styles.aStyle} href='#satisfactionGaurenteedModal'>Learn more</a></span>)}</p>
                        </div>
                    </li>
                    ))} 
                </ul>
            </div>
            <div className={styles.col2}>
                <div>
                    <div className={styles.liDiv}>
                        <h4>Questions?</h4>
                        <p>Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
                        <button onClick={scheduleConsultationClick}>Schedule Consultation</button>
                        <div className={styles.phoneDiv}>
                            <a href={`tel:${CONSTANTS.CONTACTS.TEL}`}>
                                <img src="https://www.squadhelp.com/resources/assets/imgs/front/phone_icon.svg" alt="phone" />
                                <span>{CONSTANTS.CONTACTS.TEL}</span>
                            </a>
                        </div>
                        <p>Call us for assistance</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BenefitsAndQuestions
