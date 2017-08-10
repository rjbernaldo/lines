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
    this.setState({ hover: true })
  }

  handleMouseLeave() {
    this.setState({ hover: false })
  }

  render() {
    const { x, y, handleMouseDown, degrees } = this.props;
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
