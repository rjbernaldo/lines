import { OPEN_MODAL, SUBMIT_MODAL } from '../actions/modal';

const initialState = {
  open: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      console.log('open modal?', action);
      return Object.assign({}, state, {
        open: true,
      });
    }
    case SUBMIT_MODAL: {
      console.log(action.data);
      return Object.assign({}, state, {
        open: false,
      });
    }
    default: {
      return state;
    }
  }
}

