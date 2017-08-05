import { ADD_POINT } from '../actions/drawing';

const initialState = {
  points: {
    // 0: { x: 100, y: 350, prev: null, next: 1 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINT: {
      const current = state.points;
      const nextKey = Object.keys(current).length;
      const prev = nextKey - 1;
      return {

      }
      break;
    }
    default: {
      return state;
      break;
    }
  }
}
