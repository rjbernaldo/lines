import React, { Component } from 'react';

import Anchor from './Anchor';
import Line from './Line';

class Drawing extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.anchorMouseDown = this.anchorMouseDown.bind(this);

    this.renderAnchors = this.renderAnchors.bind(this);
    this.renderLines = this.renderLines.bind(this);

    this.endDraw = this.endDraw.bind(this);

    this.state = {
      touched: false,
      dragging: false,
      origin: {},
      mouse: {},
    };
  }

  componentDidMount() {
    this.setState({ svg: document.getElementsByTagName('svg')[0] });
  }

  endDraw() {
    const { setSelect } = this.props;

    this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
      setSelect();
    });
  }

  handleMouseDown(e) {
    const { mode } = this.props;
    const drawMode = mode === 'DRAW';

    if (e.target.tagName === 'circle' && drawMode) {
      e.target.ondblclick = () => {
        this.endDraw();
      };
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      const { mode, points, modifyPoint, setSelect, setDraw } = this.props;
      const selectMode = mode === 'SELECT';
      const drawMode = mode === 'DRAW';

      const id = Object.keys(points).filter(k => points[k] === p)[0];
      const { prev, next, x, y } = points[id];
      const origin = { id, x, y };

      if (selectMode) {
        this.setState({ touched: true, origin });
      } else if (drawMode && this.state.origin.id !== id) {
        if (prev && next) {
          alert('Unable to add more connections to anchor.');
        } else {
          modifyPoint(this.state.origin.id, null, null, id);

          this.setState({ origin });
        }
      }
    };
  }

  handleMouseUp(e) {
    const { points, mode, setDraw, addPoint, setSelect } = this.props;
    const selectMode = mode === 'SELECT';
    const drawMode = mode === 'DRAW';
    const id = Math.random().toString(36).substring(7);

    if (drawMode) {
      switch (e.target.tagName) {
        case 'svg': {
          const target = this.state.svg;
          const dim = target.getBoundingClientRect();
          const x = e.clientX - dim.left;
          const y = e.clientY - dim.top;
          addPoint(id, x, y, this.state.origin.id);

          const origin = { id, x, y };
          this.setState({ origin });
          break;
        }
        case 'path': {
          const { x, y } = this.state.mouse;

          addPoint(id, x, y, this.state.origin.id);

          const origin = { id, x, y };
          this.setState({ origin });
          break;
        }
        case 'circle': {
          const c = points[this.state.origin.id];

          if (c && c.prev && c.next && !this.state.dragging) {
            this.endDraw();
          }
          break;
        }
      }
    } else {

    }

    if (e.target.tagName === 'svg' && drawMode) {
    } else if (e.target.tagName === 'path' && drawMode) {
    } else if (this.state.dragging && selectMode) {
      this.endDraw();
    } else if (e.target.tagName !== 'circle' && !this.state.dragging && selectMode) {
      setDraw();

      const target = e.target;
      const dim = target.getBoundingClientRect();
      const x = e.clientX - dim.left;
      const y = e.clientY - dim.top;

      addPoint(id, x, y, this.state.origin.id);

      const origin = { id, x, y };
      this.setState({ origin });
    } else if (e.target.tagName === 'circle' && !this.state.dragging && selectMode) {
      const c = points[this.state.origin.id];

      if (c && c.prev && c.next) {
        this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
          alert('Unable to add more connections to anchor.');
        });
      } else {
        setDraw();
      }
    } else if (e.target.tagName === 'circle' && !this.state.dragging && drawMode) {
    }
  }

  handleMouseMove(e) {
    const { mode, modifyPoint } = this.props;
    const selectMode = mode === 'SELECT';

    const dim = this.state.svg.getBoundingClientRect();
    const x = e.clientX - dim.left;
    const y = e.clientY - dim.top;

    if (selectMode) {
      if (this.state.dragging) {
        modifyPoint(this.state.origin.id, x, y);
      } else if (this.state.touched) {
        this.setState({ dragging: true });
      }
    } else {
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
