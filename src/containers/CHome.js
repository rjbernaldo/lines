import { connect } from 'react-redux';

import Home from '../components/Home';
import { openModal, closeModal } from '../actions/modal';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (form) => {
      dispatch(openModal(form));
    },
    closeModal: () => {
      dispatch(closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

