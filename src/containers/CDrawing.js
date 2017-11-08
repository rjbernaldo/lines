import { connect } from 'react-redux';
import Drawing from '../components/Drawing/index';
import { addPoint, modifyPoint, modifyDegrees, deletePoints } from '../actions/drawing';
import { setDraw, setSelect } from '../actions/mode';
import { openModal, closeModal } from '../actions/modal';

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
    modifyDegrees: (id, degrees) => {
      dispatch(modifyDegrees(id, degrees));
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
    openModal: (form) => {
      dispatch(openModal(form));
    },
    closeModal: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawing);

