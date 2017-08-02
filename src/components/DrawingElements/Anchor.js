import React, { Component } from 'react';

class Anchor extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.state = { 
      dragging: false,
      x: this.props.x,
      y: this.props.y,
      prev: this.props.prev,
      next: this.props.next,
    };
  }

  handleMouseDown(e) {
    this.setState({ dragging: true });
    // console.log('test', this.props.x, this.props.y);
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      const target = e.target.ownerSVGElement;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      this.setState({ x, y }, () => {
        this.props.handleMouseMove(x, y);
      });
    }
  }

  handleMouseUp(e) {
    this.setState({
      dragging: false,
    });
  }

  render() {
    let text;

    if (this.props.degrees) {
      text = (
        <text
          x={this.state.x - 25}
          y={this.state.y - 25}
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
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          cx={this.state.x}
          cy={this.state.y}
          fill="white"
          r="5"
        />
        { text }
      </g>
    );
  }
}

export default Anchor;
