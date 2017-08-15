import update from 'react-addons-update';

import { ADD_POINT, MODIFY_POINT } from '../actions/drawing';

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
        const p = current[prev];

        if (typeof p.next === 'undefined') {
          newState = Object.assign({}, newState, {
            points: update(current, {
              [prev]: {
                next: { $set: action.id },
              },
            }),
          });
        } else if (typeof p.prev === 'undefined') {
          newState = Object.assign({}, newState, {
            points: update(current, {
              [prev]: {
                prev: { $set: action.id },
              },
            }),
          });
        }
      }

      return newState;
    }
    case MODIFY_POINT: {
      const current = Object.assign({}, state.points);
      const origin = state.points[action.id];

      let newState = Object.assign({}, {
        points: update(current, {
          [action.id]: {
            x: { $set: action.x || origin.x },
            y: { $set: action.y || origin.y },
            next: { $set: action.next || origin.next },
          },
        }),
      });

      if (action.next) {
        newState = Object.assign({}, newState, {
          points: update(newState.points, {
            [action.next]: {
              prev: { $set: action.id },
            },
          }),
        });
      }

      return newState;
    }
    default: {
      return state;
    }
  }
}
