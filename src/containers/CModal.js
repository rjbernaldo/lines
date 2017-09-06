import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { submitModal } from '../actions/modal';

const mapStateToProps = (state) => {
  return {
    open: state.modal.open,
    form: state.modal.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitModal: (data) => {
      dispatch(submitModal(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

