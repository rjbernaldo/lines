export const ADD_POINT = 'ADD_POINT';
export const MODIFY_POINT = 'MODIFY_POINT';
export const MODIFY_DEGREES = 'MODIFY_DEGREES';
export const DELETE_POINTS = 'DELETE_POINTS';

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

export function modifyDegrees(id, degrees) {
  return {
    type: MODIFY_DEGREES,
    id,
    degrees,
  };
}

export function deletePoints(ids = []) {
  return {
    type: DELETE_POINTS,
    ids,
  };
}
