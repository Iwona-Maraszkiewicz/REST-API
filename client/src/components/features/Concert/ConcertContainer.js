import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, loadSeats } from '../../../redux/seatsRedux';
import Concert from './Concert';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsData: (seats) => dispatch(loadSeats(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Concert);