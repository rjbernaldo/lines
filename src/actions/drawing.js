export const ADD_POINT = 'ADD_POINT';
export const MOVE_POINT = 'MOVE_POINT';

export function addPoint(x, y, prev) {
  return {
    type: ADD_POINT,
    x,
    y,
    prev,
  };
}

export function movePoint(key, x, y) {
  return {
    type: MOVE_POINT,
    key,
    x,
    y,
  };
}
