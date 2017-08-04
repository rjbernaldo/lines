import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
// import { login, logout } from '../actions/credentials'

const mapStateToProps = (state) => {
  return {
    points: state.drawing.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawing);
