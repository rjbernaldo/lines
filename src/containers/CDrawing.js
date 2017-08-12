import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
import { addPoint, movePoint } from '../actions/drawing';
import { setDraw, setSelect } from '../actions/mode';

const mapStateToProps = (state) => {
  return {
    points: state.drawing.points,
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPoint: (id, x, y, prev) => {
      dispatch(addPoint(id, x, y, prev));
    },
    movePoint: (key, x, y) => {
      dispatch(movePoint(key, x, y));
    },
    setSelect: () => {
      dispatch(setSelect());
    },
    setDraw: () => {
      dispatch(setDraw());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawing);
