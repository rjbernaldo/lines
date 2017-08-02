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
      degrees: calculateDegrees(this.props.prev, this.props, this.props.next),
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
      const degrees = calculateDegrees(this.state.prev, this.state, this.state.next);

      this.setState({ x, y, degrees }, () => {
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

    if (this.state.degrees) {
      text = (
        <text
          x={this.state.x - 25}
          y={this.state.y - 25}
          fontFamily="sans-serif"
          fontSize="12px"
          stroke="none"
          fill="black"
        >
          {this.state.degrees}
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
          r="3"
        />
        { text }
      </g>
    );
  }
}

export default Anchor;

function calculateDegrees(A, B, C) {
  if (A && B && C) {
  console.log(A, B, C);
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
   console.log(angle);
    return angle * 180 / Math.PI;
  }

  return null;
}