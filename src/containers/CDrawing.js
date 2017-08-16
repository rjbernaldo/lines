import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
import { addPoint, modifyPoint, deletePoint } from '../actions/drawing';
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
    modifyPoint: (id, x, y, next) => {
      dispatch(modifyPoint(id, x, y, next));
    },
    deletePoint: (id) => {
      dispatch(deletePoint(id));
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
