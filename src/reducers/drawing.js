// import { LOGIN, LOGOUT } from '../actions/drawing';

const initialState = {
  points: {
    // 0: { x: 100, y: 350, prev: null, next: 1 },
    // 1: { x: 250, y: 50, prev: 0, next: 2 },
    // 2: { x: 400, y: 350, prev: 1 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
      break;
    }
  }
}
