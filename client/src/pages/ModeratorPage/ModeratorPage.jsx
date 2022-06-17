import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getOffersAction} from './../../actions/actionCreator'
import OffersList from '../../components/Offers/OffersList/OffersList';
import {setOfferStatus} from '../../actions/actionCreator'
import styles from './ModeratorPage.module.sass';
import Header from '../../components/Header/Header';

class ModeratorPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      limit: 5,
      offset: 0,
    }
  };
  
  componentDidMount(){
    const data = {
      limit: this.state.limit,
      offset: this.state.offset,
    }
    this.props.getOffers(data);
  };

  next = () => {
    const {offset, limit} = this.state;
    const {haveMore} = this.props;
    if(haveMore){
      this.setState({offset: offset + limit});
    }
  }

  prev = () => {
    const {offset, limit} = this.state;
    if(offset <= 0){
      this.setState({offset: 0});
    } else {
      this.setState({offset: offset - limit});
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.offset !== this.state.offset){
      const data = {
        limit: this.state.limit,
        offset: this.state.offset,
      }
      this.props.getOffers(data);
    }
  }


  render() {
    const {offers, setOfferStatus} = this.props;
    console.log(offers);
    return (
      <>
        <Header />
        <div className={styles.mainContainer}>
          <OffersList offers={offers} setOfferStatus={setOfferStatus}/>
          <div className={styles.btnContainer}>
            <button className={styles.btnStyle} onClick={this.prev}>Prev</button>
            <button className={styles.btnStyle} onClick={this.next}>Next</button>
          </div>
      </div>
      </>

    )
  }
}

const mapStateToProps = (state) => state.offersStore;
const mapDispatchToProps = (dispatch) => ({
    getOffers: (data) => dispatch(getOffersAction(data)),
    setOfferStatus: (data) => dispatch(setOfferStatus(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPage)