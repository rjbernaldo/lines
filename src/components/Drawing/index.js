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
      edit: {},
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
    if (e.target.tagName === 'circle' && mode === 'DRAW') {
      e.target.ondblclick = () => {
        this.endDraw();
      };
    }
  }

  anchorMouseDown(p) {
    return (e) => {
      if (e.nativeEvent.which === 3) return;

      const { mode, points, modifyPoint } = this.props;
      const selectMode = mode === 'SELECT';
      const drawMode = mode === 'DRAW';

      const id = Object.keys(points).filter(k => points[k] === p)[0];
      const lastId = this.state.origin.id;
      const { x, y, connections } = points[id];
      const origin = { id, x, y };

      if (selectMode) {
        this.setState({ touched: true, origin });
      } else if (drawMode && lastId !== id) {
        if (connections.length === 2) {
          alert('Unable to add more connections to anchor.');
        } else {
          this.setState({ origin }, () => {
            modifyPoint(id, null, null, lastId);
            modifyPoint(lastId, null, null, id);
          });
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
    if (e.nativeEvent.which === 3) return;

    const { mode, points, setDraw, setSelect } = this.props;

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
          if (c && c.connections.length === 2) this.endDraw();
          break;
        }
        default: {
        }
      }
    } else if (!this.state.dragging) {
      setDraw();

      if (e.target.tagName === 'circle') {
        const c = points[this.state.origin.id];

        if (c && c.connections.length === 2) {
          this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
            setSelect();
            alert('Unable to add more connections to anchor.');
          });
        }
      } else {
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
    const { deletePoint, mode, points } = this.props;
    const { id, x, y, connections } = points[k];
    const handleMouseDown = this.anchorMouseDown(points[k]);

    const prev = connections[0]
      ? points[connections[0]]
      : null;

    const next = connections[1]
      ? points[connections[1]]
      : this.state.origin.id === id
        ? this.state.mouse
        : null;

    const deleteAnchor = (e) => {
      e.preventDefault();
      deletePoint(id);
    };

    return (
      <Anchor
        onContextMenu={deleteAnchor}
        key={i}
        x={x}
        y={y}
        prev={prev}
        next={next}
        handleMouseDown={handleMouseDown}
        mode={mode}
      />
    );
  }

  renderLines(line, i) {
    const { points, mode, modifyPoint } = this.props;
    const currentId = line[0];
    const nextId = line[1];

    if (nextId) {
      const current = points[currentId];
      const next = points[nextId];

      return (
        <Line
          key={i}
          current={current}
          next={next}
          mode={mode}
          modifyPoint={(x, y) => {
            modifyPoint(nextId, x, y);
          }}
        />
      );
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

    const renderActiveLine = (mode) => {
      const current = this.state.origin;
      const next = this.state.mouse;

      if (mode === 'DRAW' && current.x && current.y && next.x && next.y) {
        return (
          <Line
            current={current}
            next={next}
          />
        );
      }
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
          generateLines(this.props.points)
            .map(this.renderLines)
        }
        {
          renderActiveLine(this.props.mode)
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

function generateLines(points) {
  const lines = [];
  const parsedConnections = [];
  const pointObjects = Object
    .keys(points)
    .map(id => points[id]);

  pointObjects.forEach((point) => {
    const line = [point.id];
    point.connections.forEach((connection) => {
      const connectedPoints = `${line}${connection}`
        .split('')
        .sort()
        .join('');

      if (parsedConnections.indexOf(connectedPoints) === -1) {
        lines.push(line.concat(connection));
        parsedConnections.push(connectedPoints);
      }
    });
  });

  return lines;
}
