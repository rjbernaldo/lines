import update from 'react-addons-update';

import { ADD_POINT, MODIFY_POINT } from '../actions/drawing';

const initialState = {
  points: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_POINT: {
      const current = Object.assign({}, state.points);
      const connections = [];
      const { id, x, y, previousId } = action;
      if (previousId) connections.push(previousId);

      current[id] = {
        id,
        x,
        y,
        connections,
      };

      let newState = Object.assign({}, state, { points: current });

      if (previousId && current[previousId].connections.length < 2) {
        newState = Object.assign({}, newState, {
          points: update(current, {
            [previousId]: {
              connections: { $set: current[previousId].connections.concat(id) },
            },
          }),
        });
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
          },
        }),
      });

      if (action.nextId) {
        newState = Object.assign({}, {
          points: update(newState.points, {
            [action.id]: {
              connections: { $set: current[action.id].connections.concat(action.nextId) },
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
