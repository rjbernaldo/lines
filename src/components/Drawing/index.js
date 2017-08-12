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
      touched: false,
      dragging: false,
      width: 0,
      height: 0,
      origin: {},
      mouse: {},
    };
  }

  componentDidMount() {
    this.setState({
      svg: document.getElementsByTagName('svg')[0],
    });
  }

  handleDoubleClick(e) {
    const { mode, setSelect } = this.props;
    const drawMode = mode === 'DRAW';

    if (e.target.tagName === 'circle' && drawMode) {
      this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
        setSelect();
      });
    }
  }

  handleMouseDown(e) {
    const { mode } = this.props;
    const drawMode = mode === 'DRAW';

    if (e.target.tagName === 'circle' && drawMode) {
      e.target.ondblclick = this.handleDoubleClick;
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      const { mode, points, modifyPoint } = this.props;
      const selectMode = mode === 'SELECT';
      const drawMode = mode === 'DRAW';

      if (selectMode) {
        const id = Object.keys(points).filter(k => points[k] === p)[0];
        const { x, y } = points[id];

        this.setState({
          touched: true,
          origin: {
            id,
            x,
            y,
          },
        });
      } else if (drawMode) {
        const id = Object.keys(points).filter(k => points[k] === p)[0];
        const { x, y } = points[id];

        modifyPoint(this.state.origin.id, null, null, id)

        this.setState({
          touched: true,
          origin: {
            id,
            x,
            y,
          },
        });
      }
    };
  }

  handleMouseUp(e) {
    const { mode, setDraw, addPoint } = this.props;
    const selectMode = mode === 'SELECT';
    const drawMode = mode === 'DRAW';

    if (e.target.tagName === 'svg' && drawMode) {
      const target = this.state.svg;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      const id = Math.random().toString(36).substring(7);
      addPoint(id, x, y, this.state.origin.id);

      this.setState({
        origin: {
          id,
          x,
          y,
        },
      });
    } else if (e.target.tagName === 'path' && drawMode) {
      const { x, y } = this.state.mouse;

      const id = Math.random().toString(36).substring(7);
      addPoint(id, x, y, this.state.origin.id);

      this.setState({
        origin: {
          id,
          x,
          y,
        },
      });
    } else if (this.state.dragging && selectMode) {
      this.setState({ touched: false, dragging: false, id: null, target: null });
    } else if (e.target.tagName !== 'circle' && !this.state.dragging && selectMode) {
      setDraw();

      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      const id = Math.random().toString(36).substring(7);
      addPoint(id, x, y, this.state.origin.id);

      this.setState({
        origin: {
          id,
          x,
          y,
        },
      });
    } else if (e.target.tagName === 'circle' && !this.state.dragging && selectMode) {
      setDraw();
      this.setState({
        touched: false,
      });
    }
  }

  handleMouseMove(e) {
    const { modifyPoint } = this.props;
    const selectMode = this.props.mode === 'SELECT';
    const drawMode = this.props.mode === 'DRAW';

    if (this.state.touched && !this.state.dragging && selectMode) {
      this.setState({ dragging: true });
    } else if (this.state.dragging && selectMode) {
      const dim = this.state.svg.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      modifyPoint(this.state.id, x, y);
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

    let p;
    let n;

    if (prev) p = this.props.points[prev];
    if (next) n = this.props.points[next];

    const drawMode = this.props.mode === 'DRAW';

    if (typeof n === 'undefined' && drawMode && k === this.state.origin.id) {
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
    const { points, mode } = this.props;
    const current = points[k];
    const drawMode = mode === 'DRAW';

    if (current.next) {
      const next = points[current.next];

      return (
        <Line
          key={i}
          current={current}
          next={next}
          mode={mode}
        />
      );
    } else if (drawMode) {
      const origin = this.state.origin;
      const next = this.state.mouse;

      if (origin.x && origin.y && next.x && next.y) {
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
      cursor: this.state.touched
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
