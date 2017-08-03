import React, { Component } from 'react';

class Anchor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let text;

    if (this.props.degrees) {
      text = (
        <text
          x={this.props.x - 25}
          y={this.props.y - 25}
          fontFamily="sans-serif"
          fontSize="12px"
          stroke="none"
          fill="black"
        >
          {this.props.degrees}
        </text>
      );
    }
    
    return (
      <g>
        <circle
          onMouseDown={this.props.handleMouseDown}
          cx={this.props.x}
          cy={this.props.y}
          fill="white"
          r="5"
        />
        { text }
      </g>
    );
  }
}

export default Anchor;
