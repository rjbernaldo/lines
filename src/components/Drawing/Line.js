import React, { Component } from 'react';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      hover: false,
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    const { i, current, next } = this.props;

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
        { calculateLength(current, next) }
      </text>
    );

    const stroke = this.state.hover && this.props.mode === 'SELECT'
        ? 'blue'
        : 'black';

    return (
      <g>
        <path
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          key={i}
          d={`M${current.x} ${current.y} L${next.x} ${next.y}`}
          stroke={stroke}
          strokeWidth="3"
          fill="none"
        />
        { text }
      </g>
    );
  }
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
