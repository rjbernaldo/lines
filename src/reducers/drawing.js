import update from 'react-addons-update';

import { ADD_POINT } from '../actions/drawing';

const initialState = {
  points: {
    // 0: { x: 100, y: 350, prev: null, next: 1 },
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINT: {
      const current = Object.assign({}, state.points);
      const next = Object.keys(current).length;
      const prev = next - 1;

      current[next] = {
        x: action.x,
        y: action.y,
        prev,
        next: null,
      };

      let newState = Object.assign({}, state, { points: current });

      if (prev > -1) {
        newState = Object.assign({}, newState, {
          points: update(current, {
            [prev]: {
              next: { $set: next },
            },
          }),
        });
      }

      return newState;
      break;
    }
    default: {
      return state;
      break;
    }
  }
}
