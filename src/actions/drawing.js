export const ADD_POINT = 'ADD_POINT';
export const MODIFY_POINT = 'MODIFY_POINT';

export function addPoint(id, x, y, previousId) {
  return {
    type: ADD_POINT,
    id,
    x,
    y,
    previousId,
  };
}

export function modifyPoint(id, x, y, nextId) {
  return {
    type: MODIFY_POINT,
    id,
    x,
    y,
    nextId,
  };
}
