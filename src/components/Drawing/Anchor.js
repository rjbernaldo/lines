import React, { Component } from 'react';

const Anchor = ({ x, y, handleMouseDown, degrees }) => {
  let text;

  if (degrees) {
    text = (
      <text
        style={{
          WebkitUserSelect: 'none',
        }}
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
        stroke="black"
        strokeWidth="3"
        fill="white"
        r="5"
      />
      { text }
    </g>
  );
};

export default Anchor;
