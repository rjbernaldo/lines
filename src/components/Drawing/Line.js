import React, { Component } from 'react';

const Line = ({ i, current, next }) => {
  const mid = calculateMidPoint(current, next);

  const text = (
    <text
      style={{
        WebkitUserSelect: 'none',
      }}
      x={mid.x - 25}
      y={mid.y - 25}
      fontFamily="sans-serif"
      fontSize="12px"
      stroke="none"
      fill="black"
    >
      {calculateLength(current, next)}
    </text>
  );

  return (
    <g>
      <path
        key={i}
        d={`M${current.x} ${current.y} L${next.x} ${next.y}`}
        stroke="black"
        strokeWidth="3"
        fill="none"
      />
      { text }
    </g>
  );
};

export default Line;

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}

function calculateMidPoint(c, n) {
  const a = c.x + n.x;
  const b = c.y + n.y;

  return {
    x: parseInt(a/2),
    y: parseInt(b/2),
  };
}
