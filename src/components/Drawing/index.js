import React, { Component } from 'react';

import Anchor from './Anchor';
import Line from './Line';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.addPoint = this.props.addPoint.bind(this);
    this.movePoint = this.props.movePoint.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.anchorMouseDown = this.anchorMouseDown.bind(this);

    this.renderAnchors = this.renderAnchors.bind(this);
    this.renderLines = this.renderLines.bind(this);

    this.state = {
      target: null,
      dragging: false,
      key: null,
      width: 0,
      height: 0,
    };
  }

  handleMouseDown(e) {
    if (e.target.tagName === 'svg' && this.props.mode === 'SELECT') {
      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      this.addPoint(x, y);
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      const key = Object.keys(this.props.points).filter(k => this.props.points[k] === p);

      this.setState({ dragging: true, target: e.target.ownerSVGElement, key });
    };
  }

  handleMouseUp(e) {
    if (this.state.dragging) {
      this.setState({ dragging: false, key: null, target: null });
    }
  }

  handleMouseMove(e) {
    if (this.state.dragging) {
      const dim = this.state.target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      this.movePoint(this.state.key, x, y);
    }
  }

  renderAnchors(k, i) {
    const points = this.props.points;
    const { x, y, prev, next } = points[k];
    const handleMouseDown = this.anchorMouseDown(points[k]);
    const degrees = calculateDegrees(
      this.props.points[prev],
      { x, y },
      this.props.points[next],
    );

    return (
      <Anchor
        key={i}
        x={x}
        y={y}
        handleMouseDown={handleMouseDown}
        degrees={degrees}
      />
    );
  }

  renderLines(k, i) {
    const points = this.props.points;
    const current = points[k];

    if (current.next) {
      const next = points[current.next];

      return (
        <Line
          key={i}
          x={current.x}
          y={current.y}
          nx={next.x}
          ny={next.y}
        />
      );
    }

    return null;
  }

  render() {
    const style = {
      cursor: this.props.mode === 'DRAW'
        ? 'crosshair'
        : true,
    };

    return (
      <svg
        style={style}
        height="100%"
        width="100%"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        {
          Object
            .keys(this.props.points)
            .map(this.renderLines)
        }
        {
          Object
            .keys(this.props.points)
            .map(this.renderAnchors)
        }
      </svg>
    );
  }
}

export default Drawing;

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
