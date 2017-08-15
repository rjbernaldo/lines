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
    this.addPoint = this.addPoint.bind(this);
    this.calculateCoords = this.calculateCoords.bind(this);

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
    this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
      this.props.setSelect();
    });
  }

  handleMouseDown(e) {
    const { mode } = this.props;
    if (e.target.tagName === 'circle' && mode === 'DRAW') {
      e.target.ondblclick = () => {
        this.endDraw();
      };
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      const { mode, points, modifyPoint } = this.props;
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

  calculateCoords(e, target = this.state.svg) {
    const dim = target.getBoundingClientRect();
    const x = e.clientX - dim.left;
    const y = e.clientY - dim.top;

    return { x, y };
  }

  addPoint(coords, previousId) {
    const { addPoint } = this.props;
    const { x, y } = coords;
    const id = Math.random().toString(36).substring(7);

    addPoint(id, x, y, previousId);

    const origin = { id, x, y };
    this.setState({ origin });
  }

  handleMouseUp(e) {
    const { mode, points, setDraw } = this.props;

    if (mode === 'DRAW') {
      switch (e.target.tagName) {
        case 'svg': {
          this.addPoint(
            this.calculateCoords(e),
            this.state.origin.id,
          );
          break;
        }
        case 'path': {
          const coords = this.state.mouse;
          this.addPoint(
            this.state.mouse,
            this.state.origin.id,
          );
          break;
        }
        case 'circle': {
          const c = points[this.state.origin.id];

          if (c && c.prev && c.next) this.endDraw();
          break;
        }
        default: {
          console.log(e.target.tagName);
        }
      }
    } else if (!this.state.dragging) {
      if (e.target.tagName === 'circle') {
        const c = points[this.state.origin.id];

        if (c && c.prev && c.next) {
          this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
            alert('Unable to add more connections to anchor.');
          });
        } else {
          setDraw();
        }
      } else {
        setDraw();

        this.addPoint(
          this.calculateCoords(e),
          this.state.origin.id,
        );
      }
    } else {
      this.endDraw();
    }
  }

  handleMouseMove(e) {
    const { mode, modifyPoint } = this.props;
    const selectMode = mode === 'SELECT';

    const { x, y } = this.calculateCoords(e);

    if (selectMode) {
      if (this.state.dragging) {
        modifyPoint(this.state.origin.id, x, y);
      } else if (this.state.touched) {
        this.setState({ dragging: true });
      }
    } else {
      const mouse = { x, y };
      this.setState({ mouse });
    }
  }

  renderAnchors(k, i) {
    const { mode, points } = this.props;
    const { x, y, prev, next } = points[k];
    const handleMouseDown = this.anchorMouseDown(points[k]);

    const p = prev ? points[prev] : null;
    const n = next ? points[next] : this.state.mouse;

    return (
      <Anchor
        key={i}
        x={x}
        y={y}
        prev={p}
        next={n}
        handleMouseDown={handleMouseDown}
        mode={mode}
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
