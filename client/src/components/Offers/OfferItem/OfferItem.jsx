import React from 'react';
import CONSTANTS from '../../../constants';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames';
import Rating from 'react-rating';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import styles from './OfferItem.module.sass';

function OfferItem(props) {
    const {offer} = props;
    const {avatar, firstName, lastName, email, rating, } = offer.User;
    const {contestType} = offer.Contest;

    const offerStatus = () => {
        const { status } = offer;
        if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
          return <i className={classNames('fas fa-times-circle reject', styles.reject)} />;
        } if (status === CONSTANTS.OFFER_STATUS_WON) {
          return <i className={classNames('fas fa-check-circle resolve', styles.resolve)} />;
        }
        return null;
    };

    const needButtons = (offerStatus) => {
        //const contestCreatorId = this.props.contestByIdStore.contestData.User.id;
        //const userId = this.props.userStore.data.id;
        //const contestStatus = this.props.contestByIdStore.contestData.status;
        const contestStatus = offer.Contest.status;
        return (contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE && offerStatus === CONSTANTS.OFFER_STATUS_PENDING);
    };

    const setOfferStatus = (creatorId, offerId, command) => {
        const { id, orderId, priority } = offer.Contest;
        const obj = {
            command,
            offerId,
            creatorId,
            orderId,
            priority,
            contestId: id,
          };
          props.setOfferStatus(obj);
    };

    const approveOffer = () => {
        confirmAlert({
          title: 'confirm',
          message: 'Are u sure?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => setOfferStatus(offer.User.id, offer.id, 'approve'),
            },
            {
              label: 'No',
            },
          ],
        });
      };
    
      const rejectOffer = () => {
        confirmAlert({
          title: 'confirm',
          message: 'Are u sure?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => setOfferStatus(offer.User.id, offer.id, 'reject'),
            },
            {
              label: 'No',
            },
          ],
        });
      };

    return (
        <div className={styles.offerContainer}>
            {offerStatus()}
            <div className={styles.mainInfoContainer}>
                <div className={styles.userInfo}>
                    <div className={styles.creativeInfoContainer}>
                        <img src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`} alt="user" />
                        <div className={styles.nameAndEmail}>
                            <span>{`${firstName} ${lastName}`}</span>
                            <span>{email}</span>
                        </div>
                    </div>
                    <div className={styles.creativeRating}>
                        <span className={styles.userScoreLabel}>Creative Rating </span>
                        <Rating
                        initialRating={rating}
                        fractions={2}
                        fullSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
                        placeholderSymbol={<img src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`} alt="star" />}
                        emptySymbol={(
                            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`} alt="star-outline" />
                        )}
                        readonly
                        />
                    </div>
                </div>
                <div className={styles.contestContainer}>
                  <div><span className={styles.response}>Cotest Type: {contestType}</span></div>
                  <div><span className={styles.response}>Contest Status: {offer.Contest.status}</span></div>
                  <div><span className={styles.response}>Offer Status: {offer.status}</span></div>
                </div>
                <div className={styles.responseContainer}>
                    {
                        contestType === CONSTANTS.LOGO_CONTEST
                        ? (
                            <img className={styles.responseLogo} src={`${CONSTANTS.publicURL}${offer.fileName}`} alt="logo" />
                        )
                        : <span className={styles.response}>{offer.text}</span>
                    }
                </div>
            </div>
            {needButtons(offer.status) && (
                <div className={styles.btnsContainer}>
                    <div onClick={approveOffer} className={styles.approveBtn}>Approve</div>
                    <div onClick={rejectOffer} className={styles.rejectBtn}>Reject</div>
                </div>
            )}
        </div>
    )
}

export default OfferItem