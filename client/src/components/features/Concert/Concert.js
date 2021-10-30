import React from 'react';
import { Row, Col } from 'reactstrap';
import io from 'socket.io-client';

import './Concert.scss';
class Concert extends React.Component {

  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();
    this.socket = io.connect((process.env.NODE_ENV === 'production') ? '/' : 'http://localhost:8000');
    this.socket.on('seatsUpdated', seats => loadSeatsData(seats));
  }

  ticketByDay = (day) => {
    const {seats} = this.props;

    return seats.filter(seat => seat.day === day)
  }

  render() {
    const { performer, price, genre, day, image } = this.props;

    return(
      <article className="concert" >
        <Row noGutters>
          <Col xs="6">
            <div className="concert__image-container">
              <img className="concert__image-container__img" src={image} alt={performer}/>
            </div>
          </Col>
          <Col xs="6">
            <div className="concert__info">
              <img className="concert__info__back" src={image} alt={performer}/>
              <h2 className="concert__info__performer">{ performer }</h2>
              <h3 className="concert__info__genre">{ genre }</h3>
              <p className="concert__info__tickets">Only {50 - this.ticketByDay(day).length} tickets left</p>
              <p className="concert__info__day-n-price">Day: {day}, Price: { price }$</p>
            </div>
          </Col>
        </Row>
      </article>
    );
  }
}

export default Concert;