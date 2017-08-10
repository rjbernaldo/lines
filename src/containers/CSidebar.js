import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { setDraw, setSelect } from '../actions/mode';

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMode: (mode) => {
      return mode === 'DRAW'
        ? dispatch(setSelect())
        : dispatch(setDraw());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
