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

    const { modifyPoint, x, y, prev, next } = this.props;

    if (isNaN(this.state.input)) {
      alert('Please enter a valid integer.');
    } else {
      const modifiedAngle = parseInt(this.state.input);

      this.setState({
        input: null,
      }, () => {
        const a = prev;
        const b = { x, y };
        const c = next;
        const length = calculateLength(b, c);
        const quadrant = calculateQuadrant(b, c);
        const coords = calculateNewCoordinates(b, modifiedAngle, length, quadrant);

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

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}

function calculateNewCoordinates(origin, angle, length, quadrant, modifiedLength) {
  let x;
  let y;

  const finalLength = modifiedLength || length;

  switch (quadrant) {
    case 1:
    case 2: {
      x = origin.x + (Math.cos((angle * Math.PI)/180) * finalLength);
      y = origin.y - (Math.sin((angle * Math.PI)/180) * finalLength);
      break;
    }
    case 3:
    case 4: {
      x = origin.x + (Math.cos((angle * Math.PI)/180) * finalLength);
      y = origin.y + (Math.sin((angle * Math.PI)/180) * finalLength);
      break;
    }
    default: {
      console.log('error', quadrant);
      break;
    }
  }

  const result = { x, y };
  const newLength = calculateLength(origin, result);

  if (newLength < length) {
    const l = finalLength + 0.01;
    return calculateNewCoordinates(origin, angle, length, quadrant, l);
  } else if (newLength > length) {
    const l = finalLength - 0.01;
    return calculateNewCoordinates(origin, angle, length, quadrant, l);
  }

  return result;
}

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

function calculateQuadrant(c, n) {
  if (c.x < n.x && c.y > n.y) return 1;
  if (c.x > n.x && c.y > n.y) return 2;
  if (c.x > n.x && c.y < n.y) return 3;
  if (c.x < n.x && c.y < n.y) return 4;

  return 0;
}
