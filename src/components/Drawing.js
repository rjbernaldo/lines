import React, { Component } from 'react';
import * as d3 from 'd3';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown(this);
    this.handleMouseUp = this.handleMouseUp(this);
    this.handleMouseMove = this.handleMouseMove(this);

    this.state = {
      drawing: null,
      line: null
    };
  }

  componentDidMount() {
    const drawing = d3.select('#drawing')
      .append('svg')
      .attr('width', 500)
      .attr('height', 500)
      .on('mousedown', this.handleMouseDown)
      .on('mouseup', this.handleMouseUp);

    this.setState({ drawing });
  }

  handleMouseDown(component) {
    return function () {
      const d = component.state.drawing;
      const m = d3.mouse(this);

      const line = d.append('line')
        .attr('x1', m[0])
        .attr('y1', m[1])
        .attr('x2', m[0])
        .attr('y2', m[1])
        .attr('stroke-width', 2)
        .attr('stroke', 'black');

      component.setState({ line });

      d.on('mousemove', component.handleMouseMove);
    };
  }

  handleMouseUp(component) {
    return function () {
      component.state.drawing
        .on('mousemove', null);
    };
  }

  handleMouseMove(component) {
    return function () {
      const m = d3.mouse(this);

      component.state.line
        .attr('x2', m[0])
        .attr('y2', m[1]);
    };
  }

  render() {
    return (
      <div id="drawing" style={{ height: '500px', width: '500px' }} />
    );
  }
}

export default Drawing;
