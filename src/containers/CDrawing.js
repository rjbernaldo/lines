import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
import { addPoint, modifyPoint, deletePoints } from '../actions/drawing';
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
    deletePoints: (ids) => {
      dispatch(deletePoints(ids));
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
