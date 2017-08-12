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
      const prev = action.prev;

      current[action.id] = {
        x: action.x,
        y: action.y,
        prev,
      };

      let newState = Object.assign({}, state, { points: current });

      if (prev) {
        newState = Object.assign({}, newState, {
          points: update(current, {
            [prev]: {
              next: { $set: action.id },
            },
          }),
        });
      }

      return newState;
    }
    case MOVE_POINT: {
      return Object.assign({}, {
        points: update(state.points, {
          [action.id]: {
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
