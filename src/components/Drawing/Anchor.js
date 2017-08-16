import React, { Component } from 'react';

class Anchor extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      hover: false,
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { x, y, handleMouseDown, onContextMenu, prev, next } = this.props;

    const degrees = calculateDegrees(prev, { x, y }, next);

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
          {degrees}º
        </text>
      );
    }

    const stroke = this.state.hover && this.props.mode === 'SELECT'
        ? 'blue'
        : 'black';

    const fill = this.state.hover && this.props.mode === 'SELECT'
        ? 'blue'
        : 'white';

    return (
      <g>
        <circle
          onContextMenu={onContextMenu}
          onMouseDown={handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          cx={x}
          cy={y}
          stroke={stroke}
          strokeWidth="3"
          fill={fill}
          r="5"
        />
        { text }
      </g>
    );
  }
}

export default Anchor;

function calculateDegrees(A, B, C) {
  if (A && B && C) {
    const AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    const BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    const AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));

    return Math.floor(angle * 180 / Math.PI);
  }

  return null;
}
