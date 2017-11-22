import React, { Component } from 'react';

import GBox from 'grommet/components/Box';

import {
  calculateDegrees,
  calculateQuadrant,
  calculateLength,
  calculateMidPoint,
  calculateNewLengthCoordinates,
} from '../../utils/calculations';

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
      tempInput: null,
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

    const { openModal, current, next } = this.props;
    const length = calculateLength(current, next);
    this.setState({ tempInput: length }, () => {
      const form = (
        <GBox pad="medium">
          Enter new length:
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

    const { modifyPoint, current, next, closeModal } = this.props;

    if (isNaN(this.state.tempInput)) {
      alert('Please enter a valid integer.');
    } else {
      const reducedLength = parseInt(this.state.tempInput, 10);

      this.setState({
        tempInput: null,
      }, () => {
        const a = { x: current.x + 180, y: current.y };
        const b = current;
        const c = next;
        const angle = calculateDegrees(a, b, c);
        const quadrant = calculateQuadrant(b, c);
        const coords = calculateNewLengthCoordinates(
          { current, next },
          angle,
          reducedLength,
          quadrant,
        );

        modifyPoint(coords.x, coords.y);
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
    const { i, current, next, deleteConnection, handleMouseDown, openModal } = this.props;

    const mid = calculateMidPoint(current, next);
    let text;

    if (this.state.input === null) {
      text = (
        <text
          onDoubleClick={this.handleRightClick}
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
    }
    const stroke = this.state.hover && this.props.mode === 'SELECT'
      ? 'blue'
      : 'black';

    return (
      <g>
        <path
          onMouseDown={handleMouseDown}
          onContextMenu={deleteConnection}
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
}

export default Line;
