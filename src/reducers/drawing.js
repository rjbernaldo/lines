import update from 'react-addons-update';

import { ADD_POINT, MOVE_POINT } from '../actions/drawing';

const initialState = {
  points: {
    // 0: { x: 100, y: 350, prev: null, next: 1 },
  },
  lines: {

  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINT: {
      const current = Object.assign({}, state.points);
      const next = Object.keys(current).length;

      let prev;// = next - 1;

      if (action.anchor) {
        prev = action.prev;
      }

      current[next] = {
        x: action.x,
        y: action.y,
        prev,
        next: null,
      };

      let newState = Object.assign({}, state, { points: current });

      if (typeof prev !== 'undefined' && prev > -1) {
        newState = Object.assign({}, newState, {
          points: update(current, {
            [prev]: {
              next: { $set: next },
            },
          }),
        });
      }

      return newState;
    }
    case MOVE_POINT: {
      return Object.assign({}, {
        points: update(state.points, {
          [action.key]: {
            x: { $set: action.x },
            y: { $set: action.y },
          },
        }),
      });
    }
    default: {
      return state;
    }
  }
}
