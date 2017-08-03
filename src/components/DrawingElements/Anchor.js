import React, { Component } from 'react';

const Anchor = ({ x, y, degrees, handleMouseDown }) => {
  let text;

  if (degrees) {
    text = (
      <text
        x={x - 25}
        y={y - 25}
        fontFamily="sans-serif"
        fontSize="12px"
        stroke="none"
        fill="black"
      >
        {degrees}
      </text>
    );
  }

  return (
    <g>
      <circle
        onMouseDown={handleMouseDown}
        cx={x}
        cy={y}
        fill="white"
        r="5"
      />
      { text }
    </g>
  );
};

export default Anchor;
