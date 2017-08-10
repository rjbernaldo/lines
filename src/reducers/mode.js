import { SET_DRAW, SET_SELECT } from '../actions/mode';

const initialState = 'SELECT';

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DRAW: {
      return 'DRAW';
    }
    case SET_SELECT: {
      return 'SELECT';
    }
    default: {
      return state;
    }
  }
}
