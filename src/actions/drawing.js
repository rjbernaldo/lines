export const ADD_POINT = 'ADD_POINT';
export const MOVE_POINT = 'MOVE_POINT';

export function addPoint(id, x, y, prev) {
  return {
    type: ADD_POINT,
    id,
    x,
    y,
    prev,
  };
}

export function movePoint(id, x, y) {
  return {
    type: MOVE_POINT,
    id,
    x,
    y,
  };
}
