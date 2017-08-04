import React, { Component } from 'react';

const Line = ({ i, x, y, nx, ny }) => {
  return (
    <path
      key={i}
      d={`M${x} ${y} L${nx} ${ny}`}
      stroke="black"
      strokeWidth="3"
      fill="none"
    />
  );
};

export default Line;
