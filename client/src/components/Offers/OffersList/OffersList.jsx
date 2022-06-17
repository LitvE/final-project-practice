import React from 'react'
import OfferItem from '../OfferItem/OfferItem';
import styles from './OffersList.module.sass';

function OffersList(props) {
  const {offers, setOfferStatus} = props;
  //console.log(offers);
  return (
    <div className={styles.listContainer}>
        <ul className={styles.ulStyles}>
            {offers.map((offer, index) => {
                return (
                    <li key={index}>
                        <OfferItem offer={offer} setOfferStatus={setOfferStatus}/>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default OffersList