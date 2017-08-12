export const ADD_POINT = 'ADD_POINT';
export const MODIFY_POINT = 'MODIFY_POINT';

export function addPoint(id, x, y, prev) {
  return {
    type: ADD_POINT,
    id,
    x,
    y,
    prev,
  };
}

export function modifyPoint(id, x, y, next) {
  return {
    type: MODIFY_POINT,
    id,
    x,
    y,
    next,
  };
}
