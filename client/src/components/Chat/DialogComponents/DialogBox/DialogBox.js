import React from 'react';
import classNames from 'classnames';
import styles from './DialogBox.module.sass';
import CONSTANTS from '../../../../constants';

const DialogBox = (props) => {
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    goToExpandedDialog,
    chatMode,
    interlocutor,
  } = props;
  const {
    favoriteList, /*participants,*/ participant1, participant2, blackList, /*_id,*/ id, text, createAt,
  } = chatPreview;
  /*const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];*/
  const isFavorite = () => {
    if (userId === participant1){
      return favoriteList[0];
    } else if(userId === participant2){
      return favoriteList[1];
    } else {return}
  };

  const isBlocked = () => {
    if (userId === participant1){
      return blackList[0];
    } else if(userId === participant2){
      return blackList[1];
    } else {return}
  }

  return (
    <div
      className={styles.previewChatBox}
      onClick={() => goToExpandedDialog({
        interlocutor,
        conversationData: {
          //participants,
          participant1,
          participant2,
          //_id,
          id,
          blackList,
          favoriteList,
        },
      })}
    >
      <img
        src={interlocutor.avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${interlocutor.avatar}`}
        alt="user"
      />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>{interlocutor.firstName}</span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>
          <i
            onClick={(event) => changeFavorite({
              //participants,
              participant1,
              participant2,
              favoriteFlag: !isFavorite(),
            }, event)}
            className={classNames({ 'far fa-heart': !isFavorite(), 'fas fa-heart': isFavorite() })}
          />
          <i
            onClick={(event) => changeBlackList({
              //participants,
              participant1,
              participant2,
              blackListFlag: !isBlocked(),
            }, event)}
            className={classNames({ 'fas fa-user-lock': !isBlocked(), 'fas fa-unlock': isBlocked() })}
          />
          <i
            onClick={(event) => catalogOperation(event, /*_id*/ id)}
            className={classNames({
              'far fa-plus-square': chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle': chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
