import React, { Component } from 'react';

const Line = ({ i, current, next }) => {
  return (
    <path
      key={i}
      d={`M${current.x} ${current.y} L${next.x} ${next.y}`}
      stroke="black"
      strokeWidth="3"
      fill="none"
    />
  );
};

export default Line;

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}
