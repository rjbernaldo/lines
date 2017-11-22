export function calculateDegrees(A, B, C) {
  if (A && B && C) {
    const AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    const BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    const AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
    const degrees = Math.floor(angle * 180 / Math.PI);

    return degrees;
  }

  return null;
}

export function rotate(cx, cy, nx, ny, angle) {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  let x = (cos * (nx - cx)) + (sin * (ny - cy)) + cx;
  let y = (cos * (ny - cy)) - (sin * (nx - cx)) + cy;

  return { x, y };
}

export function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}

export function calculateQuadrant(c, n) {
  if (c.x < n.x && c.y > n.y) return 1;
  if (c.x > n.x && c.y > n.y) return 2;
  if (c.x > n.x && c.y < n.y) return 3;
  if (c.x < n.x && c.y < n.y) return 4;

  return 0;
}

export function calculateMidPoint(c, n) {
  const a = c.x + n.x;
  const b = c.y + n.y;

  return {
    x: parseInt(a/2),
    y: parseInt(b/2),
  };
}

export function calculateNewCoords(a, b, c, modifiedAngle, compensatedAngle) {
  const baseAngle = calculateDegrees(a, b, c);

  let newAngle = baseAngle - (compensatedAngle || modifiedAngle);

  const foo = (Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI + 180);
  const bar = (Math.atan2(c.y - b.y, c.x - b.x) * 180 / Math.PI + 180);
  const result = bar - foo;

  if (result <= 90 && result > 0) {
  } else if (result <= 180 && result > 90) {
  } else if (result >= -90 && result < 0) {
    newAngle = 0 - newAngle;
  } else if (result >= -180 && result < -90) {
    newAngle = 0 - newAngle;
  } else if (result >= -270 && result < -180) {
  } else {
    newAngle = 0 - newAngle;
  }

  const newCoords = rotate(b.x, b.y, c.x, c.y, newAngle);

  return newCoords;
}

export function calculateNewCoordinates(origin, baseAngle, angle, length, quadrant, modifiedAngle, prev) {
  let finalAngle = modifiedAngle || angle;

  switch (quadrant) {
    case 1:
    case 2: {
      finalAngle -= baseAngle;
      break;
    }
    case 3:
    case 4: {
      finalAngle += baseAngle;
      break;
    }
    default: {
      console.log('error', quadrant);
      break;
    }
  }

  const x = origin.x + (Math.cos((finalAngle * Math.PI)/180) * length);
  const y = origin.y + (Math.sin((finalAngle * Math.PI)/180) * length);

  const result = { x, y };

  return result;
}

export function calculateNewLengthCoordinates(origin, angle, length, quadrant, modifiedLength) {
  const { current, next } = origin;
  let x;
  let y;
  const finalLength = modifiedLength || length;

  switch (quadrant) {
    case 1:
    case 2: {
      x = current.x + (Math.cos((angle * Math.PI)/180) * finalLength);
      y = current.y - (Math.sin((angle * Math.PI)/180) * finalLength);
      break;
    }
    case 3:
    case 4: {
      x = current.x + (Math.cos((angle * Math.PI)/180) * finalLength);
      y = current.y + (Math.sin((angle * Math.PI)/180) * finalLength);
      break;
    }
    default: {
      console.log('error', quadrant);
      break;
    }
  }

  if (current.x === next.x) x = current.x;
  if (current.y === next.y) y = current.y;

  const result = { x, y };
  const newLength = calculateLength(current, result);

  if (newLength < length) {
    const l = finalLength + 0.01;
    return calculateNewLengthCoordinates(origin, angle, length, quadrant, l);
  } else if (newLength > length) {
    const l = finalLength - 0.01;
    return calculateNewLengthCoordinates(origin, angle, length, quadrant, l);
  }

  return result;
}

