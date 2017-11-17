import React, { Component } from 'react';

import GBox from 'grommet/components/Box';

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
      tempInput: null,
      degrees: null,
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
    const { x, y, handleMouseDown, deleteAnchor, prev, next, mode, openModal } = this.props;
    const degrees = calculateDegrees(prev, { x, y }, next);
    this.setState({ tempInput: degrees }, () => {
      const form = (
        <GBox pad="medium">
          Enter new angle:
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              ref={(input) => {
                if (input) {
                  setTimeout(() => {
                    input.focus();
                    const val = input.value;
                    input.value = '';
                    input.value = val;
                  }, 0); 
                }
              }}
              defaultValue={this.state.tempInput}
            />
          </form>
        </GBox>
      );

      openModal(form);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { modifyPoint, x, y, prev, next, closeModal } = this.props;

    if (isNaN(this.state.tempInput)) {
      alert('Please enter a valid integer.');
    } else {
      const modifiedAngle = parseInt(this.state.tempInput);

      this.setState({
        tempInput: null,
      }, () => {
        modifyPoint(modifiedAngle);

        closeModal();
      });
    }
  }

  handleChange(e) {
    this.setState({
      tempInput: e.target.value,
    });
  }

  render() {
    const { id, x, y, handleMouseDown, deleteAnchor, prev, next, mode, openModal, degrees } = this.props;

    // const degrees = calculateDegrees(prev, { x, y }, next);
    let text;

    if (degrees) {
      if (this.state.input === null) {
        text = (
          <text
            onDoubleClick={this.handleRightClick}
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
            {`${degrees}`}º
          </text>
        );
      }
    }

    const stroke = this.state.hover && mode === 'SELECT'
        ? 'blue'
        : 'black';

    const fill = this.state.hover && mode === 'SELECT'
        ? 'blue'
        : 'white';

    return (
      <g>
        <circle
          onContextMenu={deleteAnchor}
          onMouseDown={handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          cx={x}
          cy={y}
          stroke={stroke}
          strokeWidth="1"
          fill={fill}
          fillOpacity="0.1"
          r="10"
        />
        { text }
        {/* <text
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
          {x}, {y}
        </text> */}
      </g>
    );
  }
}

export default Anchor;

function calculateNewCoords(a, b, c, modifiedAngle, compensatedAngle) {
  const baseAngle = calculateDegrees(a, b, c);

  let newAngle = baseAngle - (compensatedAngle || modifiedAngle);

  const foo = (Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI + 180);
  const bar = (Math.atan2(c.y - b.y, c.x - b.x) * 180 / Math.PI + 180);
  const result = bar - foo;
console.log(result);
  if (result <= 90 && result > 0) {
  } else if (result <= 180 && result > 90) {
  } else if (result >= -90 && result < 0) {
    newAngle = 0 - newAngle;
  } else {
    newAngle = 0 - newAngle;
  }

  const newCoords = rotate(b.x, b.y, c.x, c.y, newAngle);
  return newCoords;
}

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}

function calculateNewCoordinates(origin, baseAngle, angle, length, quadrant, modifiedAngle, prev) {
  let finalAngle = modifiedAngle || angle;

  switch (quadrant) {
    case 1:
    case 2: {
      finalAngle -= baseAngle;
      break;
    }
    case 3:
    case 4: {
      finalAngle += baseAngle;
      break;
    }
    default: {
      console.log('error', quadrant);
      break;
    }
  }

  const x = origin.x + (Math.cos((finalAngle * Math.PI)/180) * length);
  const y = origin.y + (Math.sin((finalAngle * Math.PI)/180) * length);

  const result = { x, y };

  return result;
}

function calculateDegrees(A, B, C) {
  if (A && B && C) {
    const AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    const BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    const AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
    const degrees = Math.floor(angle * 180 / Math.PI);

    return degrees;
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

function rotate(cx, cy, nx, ny, angle) {
  const radians = (Math.PI / 180) * angle;

  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const x = (cos * (nx - cx)) + (sin * (ny - cy)) + cx;
  const y = (cos * (ny - cy)) - (sin * (nx - cx)) + cy;

  return { x, y };
}
