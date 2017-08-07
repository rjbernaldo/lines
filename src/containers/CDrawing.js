import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
import { addPoint, movePoint } from '../actions/drawing';

const mapStateToProps = (state) => {
  return {
    points: state.drawing.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPoint: (x, y) => {
      dispatch(addPoint(x, y));
    },
    movePoint: (key, x, y) => {
      dispatch(movePoint(key, x, y));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawing);
