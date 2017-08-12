import React, { Component } from 'react';

import Anchor from './Anchor';
import Line from './Line';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);

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

  handleDoubleClick(e) {
    const drawMode = this.props.mode === 'DRAW';

    if (e.target.tagName === 'circle' && drawMode) {
      this.props.setSelect();
    }
  }

  handleMouseDown(e) {
    const drawMode = this.props.mode === 'DRAW';

    if (e.target.tagName === 'circle' && drawMode) {
      e.target.ondblclick = this.handleDoubleClick;
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      const selectMode = this.props.mode === 'SELECT';

      if (selectMode) {
        const key = Object.keys(this.props.points).filter(k => this.props.points[k] === p);
        this.setState({ dragging: true, target: e.target.ownerSVGElement, key });
      }
    };
  }

  handleMouseUp(e) {
    const { mode, setDraw, addPoint } = this.props;
    const selectMode = mode === 'SELECT';
    const drawMode = mode === 'DRAW';

    if (e.target.tagName === 'svg' && drawMode) {
      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      addPoint(x, y);
    } else if (e.target.tagName === 'path' && drawMode) {
      const mouse = this.state.mouse;

      addPoint(mouse.x, mouse.y, this.props.points);

      this.setState({
        origin: {
          x: mouse.x,
          y: mouse.y,
        },
      });
    } else if (this.state.dragging && selectMode) {
      this.setState({ dragging: false, key: null, target: null });
    } else if (!this.state.dragging && selectMode) {
      setDraw();

      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      this.setState({
        origin: {
          x,
          y,
        },
      });

      addPoint(x, y);
    }
  }

  handleMouseMove(e) {
    const { movePoint } = this.props;
    const selectMode = this.props.mode === 'SELECT';
    const drawMode = this.props.mode === 'DRAW';

    if (this.state.dragging && selectMode) {
      const dim = this.state.target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      movePoint(this.state.key, x, y);
    } else if (e.target.tagName === 'svg' && drawMode) {
      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      this.setState({
        mouse: {
          x,
          y,
        },
      });
    }
  }

  renderAnchors(k, i) {
    const points = this.props.points;
    const { x, y, prev, next } = points[k];
    const handleMouseDown = this.anchorMouseDown(points[k]);

    const p = this.props.points[prev];
    let n = this.props.points[next];

    const drawMode = this.props.mode === 'DRAW';

    if (typeof n === 'undefined' && drawMode) {
      n = this.state.mouse;
    }

    const degrees = calculateDegrees(p, { x, y }, n);

    return (
      <Anchor
        key={i}
        x={x}
        y={y}
        handleMouseDown={handleMouseDown}
        mode={this.props.mode}
        degrees={degrees}
      />
    );
  }

  renderLines(k, i) {
    const points = this.props.points;
    const current = points[k];
    const drawMode = this.props.mode === 'DRAW';

    if (current.next) {
      const next = points[current.next];

      return (
        <Line
          key={i}
          current={current}
          next={next}
          mode={this.props.mode}
        />
      );
    } else if (drawMode) {
      const origin = this.state.origin;
      const next = this.state.mouse;

      if (next) {
        return (
          <Line
            key={i}
            current={origin}
            next={next}
          />
        );
      }
    }

    return null;
  }

  render() {
    const style = {
      cursor: this.state.dragging
        ? 'move'
        : this.props.mode === 'DRAW'
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
