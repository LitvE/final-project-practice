import React, { Component } from 'react'
import styles from './CountDown.module.sass';

class CountDown extends Component {
    constructor(props) {
        super(props)
        this.count = this.count.bind(this)
        this.state = {
            days: 0,
            minutes: 0,
            hours: 0,
            secounds: 0
        }
        this.x = null
        this.deadline = null
    }
    count () {        
        const now = new Date().getTime();
        const t = this.deadline - now;
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);
        this.setState({days, minutes, hours, seconds})
        if (t < 0) {
                clearInterval(this.x);
                this.setState({ days: 0, minutes: 0, hours: 0, seconds: 0 })
            }
    }
    componentDidMount() {
        const {eventDate, eventTime} = this.props.data;
        this.deadline = new Date(eventDate+'T'+eventTime).getTime();
        this.x = setInterval(this.count, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.x);
    }
    
    render() {
        const { days, seconds, hours, minutes } = this.state
        return ( 
            <div> 
                <div className={styles.clockdiv}>
                    <span>{days}</span> days <span>{hours}</span>hr <span>{minutes}</span>min <span>{seconds}</span>s
                </div>           
            </div>
        )
    }
}

export default CountDown