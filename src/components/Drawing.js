import React, { Component } from 'react';
import * as d3 from 'd3';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown(this);
    this.handleMouseUp = this.handleMouseUp(this);
    this.handleMouseMove = this.handleMouseMove(this);
    this.handleDrag = this.handleDrag(this);

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
      .on('mouseup', this.handleMouseUp)
      .on('drag', this.handleDrag);

    this.setState({ drawing });
  }

  handleMouseDown(component) {
    return function () {
      const d = component.state.drawing;
      const m = d3.mouse(this);

      const circle = d.append('circle')
        .attr('cx', m[0])
        .attr('cy', m[1])
        .attr('r', 3);

      const line = d.append('line')
        .attr('x1', m[0])
        .attr('y1', m[1])
        .attr('x2', m[0])
        .attr('y2', m[1])
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
        .call(component.handleDrag);

      component.setState({ line });

      d.on('mousemove', component.handleMouseMove);
    };
  }

  handleMouseUp(component) {
    return function () {
      const d = component.state.drawing;
      const m = d3.mouse(this);

      d.on('mousemove', null);

      const circle = d.append('circle')
        .attr('cx', m[0])
        .attr('cy', m[1])
        .attr('r', 3);
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

  handleDrag(component) {
    return d3.drag()
      .on('start', null)
      .on('drag', function (d) {
        const dx = d3.event.dx;
        const dy = d3.event.dy;
        const current = d3.select(this);
        const x1 = parseFloat(current.attr('x1')) + dx;
        const y1 = parseFloat(current.attr('y1')) + dy;
        const x2 = parseFloat(current.attr('x2')) + dx;
        const y2 = parseFloat(current.attr('y2')) + dy;

        component.state.line
          .attr('x1', x1)
          .attr('y1', y1)
          .attr('x2', x2)
          .attr('y2', y2);
      });
  }

  render() {
    return (
      <div id="drawing" style={{ height: '500px', width: '500px' }} />
    );
  }
}

export default Drawing;
