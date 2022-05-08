import React from 'react';
import styles from './ButtonGroupComponent.module.sass';

function ButtonGroupComponent() {
  const changeStyleOnClick = (e) => {
    let element = document.querySelector(`.${styles.frameBorder}`);
    element.classList.remove(styles.frameBorder);
    let cards = document.querySelectorAll(`.${styles.cardFrame}`);
    cards.forEach((card) => {
        if(card.contains(e.target)) {
            card.classList.add(styles.frameBorder);
        }
    })
  };

  return (
    <div className={styles.container}>
        <div id='deck' className={styles.cardDeck}>
            <div className={styles.cardFrame} onClick={changeStyleOnClick}>
                <div className={styles.cardBody}>
                    <div className={styles.divStyle}>
                        <span className={styles.spanStyle}>Yes</span>
                    </div>
                    <h5>The Domain should exactly match the name</h5>
                </div>
            </div>
            <div className={[styles.cardFrame, styles.frameBorder].join(' ')} onClick={changeStyleOnClick}>
                <div className={styles.cardBody}>
                    <div className={styles.divStyle}>
                        <span className={styles.spanStyle}>Yes</span>
                    </div>
                    <h5>But minor variations are allowed (Recommended)</h5>
                </div>
            </div>
            <div className={styles.cardFrame} onClick={changeStyleOnClick}>
                <div className={styles.cardBody}>
                    <div className={styles.divStyle}>
                        <span className={styles.spanStyle}>No</span>
                    </div>
                    <h5>I am only looking for a name, not a Domain</h5>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ButtonGroupComponent