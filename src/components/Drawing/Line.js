import React, { Component } from 'react';

class Line extends React.Component {
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
      const reducedLength = parseInt(this.state.input);

      this.setState({
        input: null,
      }, () => {
        const a = { x: current.x + 180, y: current.y };
        const b = current;
        const c = next;
        const angle = calculateDegrees(a, b, c);

        const quadrant = calculateQuadrant(b, c);
        const coords = calculateNewCoordinates(b, angle, reducedLength, quadrant);

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
    const { i, current, next } = this.props;

    const mid = calculateMidPoint(current, next);
    let text;

    if (this.state.input === null) {
      text = (
        <text
          onContextMenu={this.handleRightClick}
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
    } else {
      text = (
        <foreignObject
          x={mid.x - 25}
          y={mid.y - 25}
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
