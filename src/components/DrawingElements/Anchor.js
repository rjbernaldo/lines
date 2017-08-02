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

      this.setState({ x, y, }, () => {
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
    return (
      <circle
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        cx={this.state.x}
        cy={this.state.y}
        r="3"
      />
    );
  }
}

export default Anchor;
