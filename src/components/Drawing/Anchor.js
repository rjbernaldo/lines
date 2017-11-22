import React, { Component } from 'react';

import GBox from 'grommet/components/Box';

import {
  calculateDegrees,
} from '../../utils/calculations';

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
    const { x, y, prev, next, openModal } = this.props;
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
      const modifiedAngle = parseInt(this.state.tempInput, 10);

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
    const {
      x,
      y,
      handleMouseDown,
      deleteAnchor,
      mode,
      degrees,
    } = this.props;

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
      </g>
    );
  }
}

export default Anchor;
