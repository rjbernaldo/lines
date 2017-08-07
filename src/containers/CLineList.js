import { connect } from 'react-redux';
import LineList from '../components/LineList';

const mapStateToProps = (state) => {
  return {
    points: state.drawing.points,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LineList);
