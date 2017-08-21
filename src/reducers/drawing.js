import update from 'react-addons-update';

import { ADD_POINT, MODIFY_POINT, DELETE_POINTS } from '../actions/drawing';

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
    case DELETE_POINTS: {
      const current = Object.assign({}, state.points);

      if (action.ids.length === 1) delete current[action.ids[0]];

      Object
        .keys(current)
        .forEach((cid) => {
          const point = current[cid];

          action.ids.forEach((id) => {
            const i = point.connections.indexOf(id);

            if (i === -1) return;

            if (action.ids.length === 1) {
              point.connections = [
                ...point.connections.slice(0, i),
                ...point.connections.slice(i + 1),
              ];
            } else if (action.ids.indexOf(cid) > -1) {
              point.connections = [
                ...point.connections.slice(0, i),
                ...point.connections.slice(i + 1),
              ];
            }
          });
        });

      return Object.assign({}, state, {
        points: current,
      });
    }
    default: {
      return state;
    }
  }
}
