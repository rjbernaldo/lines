import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { closeModal } from '../actions/modal';

const mapStateToProps = (state) => {
  return {
    open: state.modal.open,
    form: state.modal.form,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

