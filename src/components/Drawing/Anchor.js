import React, { Component } from 'react';

class Anchor extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      hover: false,
      input: null,
    };
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleRightClick(e) {
    e.preventDefault();
    this.setState({ input: '' });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { modifyPoint, current, next } = this.props;

    if (isNaN(this.state.input)) {
      alert('Please enter a valid integer.');
    } else {
      const modifiedAngle = parseInt(this.state.input);

      this.setState({
        input: null,
      }, () => {
        const a = straightPoint;
        const b = current;
        const c = next;
        const length = calculateDegrees(straightPoint, current, next);

        console.log(modifiedAngle);
        const quadrant = calculateQuadrant(current, next);
        const coords = calculateNewCoordinates(current, modifiedAngle, length, quadrant);

        modifyPoint(coords.x, coords.y);
      });
    }
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  render() {
    const { x, y, handleMouseDown, onContextMenu, prev, next } = this.props;

    const degrees = calculateDegrees(prev, { x, y }, next);

    let text;

    if (degrees) {
      if (this.state.input === null) {
        text = (
          <text
          onContextMenu={this.handleRightClick}
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
      } else {
        text = (
          <foreignObject
            x={x - 25}
            y={y - 25}
            fontFamily="sans-serif"
            fontSize="12px"
            stroke="none"
            fill="black"
          >
            <form
              onSubmit={this.handleSubmit}
            >
              <input
                onChange={this.handleChange}
                ref={(input) => { if (input) input.focus(); }}
                style={{ padding: '0px' }}
              />
            </form>
          </foreignObject>
        );
      }
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
