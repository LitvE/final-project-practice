import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { backToDialogList, changeChatFavorite, changeChatBlock } from '../../../../actions/actionCreator';
import styles from './ChatHeader.module.sass';
import CONSTANTS from '../../../../constants';

const ChatHeader = (props) => {
  const changeFavorite = (data, event) => {
    props.changeChatFavorite(data);
    event.stopPropagation();
  };

  const changeBlackList = (data, event) => {
    props.changeChatBlock(data);
    event.stopPropagation();
  };

  const isFavorite = (chatData, userId) => {
    /*const { favoriteList, participants } = chatData;
    return favoriteList[participants.indexOf(userId)];*/
    const {participant1, participant2, favoriteList} = chatData;
    if (userId === participant1){
      return favoriteList[0];
    } else if(userId === participant2){
      return favoriteList[1];
    } else {return}
  };

  const isBlocked = (chatData, userId) => {
    /*const { participants, blackList } = chatData;
    return blackList[participants.indexOf(userId)];*/
    const {participant1, participant2, blackList} = chatData;
    if (userId === participant1){
      return blackList[0];
    } else if(userId === participant2){
      return blackList[1];
    } else {return}
  };

  const { avatar, firstName } = props.interlocutor;
  const { backToDialogList, chatData, userId } = props;
  return (
    <div className={styles.chatHeader}>
      <div className={styles.buttonContainer} onClick={() => backToDialogList()}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}arrow-left-thick.png`} alt="back" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <img
            src={avatar === 'anon.png' ? CONSTANTS.ANONYM_IMAGE_PATH : `${CONSTANTS.publicURL}${avatar}`}
            alt="user"
          />
          <span>{firstName}</span>
        </div>
        {chatData
                && (
                <div>
                  <i
                    onClick={(event) => changeFavorite({
                      /*participants: chatData.participants,*/
                      participant1: chatData.participant1,
                      participant2: chatData.participant2,
                      favoriteFlag: !isFavorite(chatData, userId),
                    }, event)}
                    className={classNames({
                      'far fa-heart': !isFavorite(chatData, userId),
                      'fas fa-heart': isFavorite(chatData, userId),
                    })}
                  />
                  <i
                    onClick={(event) => changeBlackList({
                      /*participants: chatData.participants,*/
                      participant1: chatData.participant1,
                      participant2: chatData.participant2,
                      blackListFlag: !isBlocked(chatData, userId),
                    }, event)}
                    className={classNames({
                      'fas fa-user-lock': !isBlocked(chatData, userId),
                      'fas fa-unlock': isBlocked(chatData, userId),
                    })}
                  />
                </div>
                )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { interlocutor, chatData } = state.chatStore;
  return { interlocutor, chatData };
};

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  changeChatFavorite: (data) => dispatch(changeChatFavorite(data)),
  changeChatBlock: (data) => dispatch(changeChatBlock(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
