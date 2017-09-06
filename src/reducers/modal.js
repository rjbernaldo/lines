import { OPEN_MODAL, SUBMIT_MODAL } from '../actions/modal';

const initialState = {
  open: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return Object.assign({}, state, {
        open: true,
        form: action.form,
      });
    }
    case SUBMIT_MODAL: {
      return Object.assign({}, state, {
        open: false,
      });
    }
    default: {
      return state;
    }
  }
}

