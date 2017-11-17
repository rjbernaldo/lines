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
      lineDragging: false,
      line: null,
    };
  }

  componentDidMount() {
    this.setState({ svg: document.getElementsByTagName('svg')[0] });

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) this.endDraw();
    }, true);
  }

  endDraw() {
    const { origin } = this.state;
    const { points, deletePoints } = this.props;

    const last = points[origin.id];
    if (last && last.connections.length === 0) {
      last.degrees = null;
      deletePoints([last.id]);
    }

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
    } else if (e.target.tagName === 'text') {
      // console.log('click!');
    }
  }

  lineMouseDown(line) {
    return (e) => {
      if (e.nativeEvent.which === 3) return;

      const { mode, points, modifyPoint } = this.props;
      const selectMode = mode === 'SELECT';

      const { x, y } = this.calculateCoords(e);
      const origin = { x, y };

      if (selectMode) {
        this.setState({
          lineDragging: true,
          line,
          origin,
        });
      }
    };
  }

  anchorMouseDown(id) {
    return (e) => {
      if (e.nativeEvent.which === 3) return;

      const { mode, points, modifyPoint } = this.props;
      const selectMode = mode === 'SELECT';
      const drawMode = mode === 'DRAW';

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
            this.state.mouse,
            // this.calculateCoords(e),
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
    } else if (this.state.lineDragging) {
      this.setState({ lineDragging: false, line: null });
    } else if (!this.state.dragging) {
      if (e.target.tagName !== 'text') setDraw();

      if (e.target.tagName === 'circle') {
        const c = points[this.state.origin.id];

        if (c && c.connections.length === 2) {
          this.setState({ origin: {}, mouse: {}, touched: false, dragging: false }, () => {
            setSelect();
            alert('Unable to add more connections to anchor.');
          });
        }
      } else if (e.target.tagName === 'text') {
        this.endDraw();
        // console.log('click!');
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
    const { mode, modifyPoint, points } = this.props;
    const selectMode = mode === 'SELECT';

    const { x, y } = this.calculateCoords(e);

    if (selectMode) {
      if (this.state.dragging) {
        let newX = x;
        let newY = y;

        const last = points[points[this.state.origin.id].connections[0]];

        if (last) {
          const diffX = Math.abs(x - last.x);
          const diffY = Math.abs(y - last.y);

          if (diffX < 20) newX = last.x;
          if (diffY < 20) newY = last.y;
        }

        modifyPoint(this.state.origin.id, newX, newY);
      } else if (this.state.touched) {
        this.setState({ dragging: true });
      } else if (this.state.lineDragging) {
        const delta = {
          x: x - this.state.origin.x,
          y: y - this.state.origin.y,
        };

        const origin = { x, y };

        this.state.line.forEach((id) => {
          const current = points[id];
          this.setState({ origin }, () => {
            modifyPoint(id, current.x + delta.x, current.y + delta.y);
          });
        });
      }
    } else {
      const mouse = { x, y };
      const diffX = Math.abs(mouse.x - this.state.origin.x);
      const diffY = Math.abs(mouse.y - this.state.origin.y);

      if (diffX < 20) mouse.x = this.state.origin.x;
      if (diffY < 20) mouse.y = this.state.origin.y;

      this.setState({
        mouse,
      });
    }
  }

  renderAnchors(k, i) {
    const { deletePoints, mode, modifyPoint, modifyDegrees, openModal, closeModal, setDraw, endDraw } = this.props;
    let points = this.props.points;
    const { id, x, y, connections } = points[k];
    const handleMouseDown = this.anchorMouseDown(id);
    const nextId = connections[1];

    const prev = connections[0]
      ? points[connections[0]]
      : null;

    const nnext = connections[1]
      ? points[connections[1]]
      : this.state.origin.id === id
        ? this.state.mouse
        : null;

    const deleteAnchor = (e) => {
      e.preventDefault();

      const { mode } = this.props;
      if (mode === 'SELECT') deletePoints([id]);
    };

    let degrees = points[id].degrees;

    if (mode === 'DRAW' || this.state.dragging) {
      const d = calculateDegrees(prev, { x, y }, nnext);
      points[id].degrees = d;
      degrees = points[id].degrees;
    }

    return (
      <Anchor
        openModal={openModal}
        closeModal={closeModal}
        deleteAnchor={deleteAnchor}
        key={i}
        id={id}
        x={x}
        y={y}
        degrees={degrees}
        prev={prev}
        next={nnext}
        handleMouseDown={handleMouseDown}
        mode={mode}
        modifyPoint={(modifiedAngle) => {
          traversePoints(points, {
          }, prev, { id, x, y }, nnext, (set) => {
            const setKeys = Object.keys(set);

            let pointId = setKeys[0];
            let point = set[pointId];
            let angle = modifiedAngle;
            let last = points[point.lastId];
            let next = points[point.nextId];

            if (!set[point.nextId]) set[point.nextId] = points[point.nextId];

            let coords = calculateNewCoords(last, point, next, angle);

            const diff = {
              origin: {
                x: set[point.nextId].x,
                y: set[point.nextId].y,
              },
              new: coords,
            };

            set[id].degrees = angle;
            set[point.nextId].x = coords.x;
            set[point.nextId].y = coords.y;
            points[id].degrees = angle;
            points[point.nextId].x = coords.x;
            points[point.nextId].y = coords.y;

            modifyPoint(point.nextId, coords.x, coords.y);

            const current = points[point.nextId];
            const nId = current.connections && current.connections[1];

            if (!set[nId]) set[nId] = points[nId];

            // if (nId) modifyPoints(modifyPoint, points, set[nId], diff, set);

          //   for (let i = 1; i < setKeys.length; i++) {
          //     pointId = setKeys[i];
          //     point = set[pointId];
          //     angle = point.degrees;
          //     last = points[point.lastId];
          //     next = points[point.nextId];

          //     coords = calculateNewCoords(last, point, next, angle);

          //     if (!set[point.nextId]) set[point.nextId] = points[point.nextId];
          //     set[point.nextId].x = coords.x;
          //     set[point.nextId].y = coords.y;
          //     points[point.nextId].x = coords.x;
          //     points[point.nextId].y = coords.y;

          //     modifyPoint(point.nextId, coords.x, coords.y);
          //   }
          setDraw();
          this.endDraw();
          });
        }}
      />
    );
  }

  renderLines(line, i) {
    const { deletePoints, points, mode, modifyPoint, openModal, closeModal } = this.props;
    const handleMouseDown = this.lineMouseDown(line);
    const currentId = line[0];
    const nextId = line[1];

    const deleteConnection = (e) => {
      e.preventDefault();

      const { mode } = this.props;
      if (mode === 'SELECT') deletePoints(line);
    }

    if (nextId) {
      const current = points[currentId];
      const next = points[nextId];

      return (
        <Line
          openModal={openModal}
          closeModal={closeModal}
          handleMouseDown={handleMouseDown}
          deleteConnection={deleteConnection}
          key={i}
          current={current}
          next={next}
          mode={mode}
          modifyPoint={(x, y) => {
            const diff = {
              origin: next,
              new: { x, y },
            };

            modifyPoints(modifyPoint, points, next, diff);
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

      return <span />;
    };

    return (
      <svg
        onContextMenu={(e) => { e.preventDefault(); }}
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

function traversePoints(points, set, a, b, c, cb) {
  const current = Object.assign({}, b, {
    lastId: a.id,
    nextId: c.id,
    angle: calculateDegrees(a, b, c),
  });

  set[b.id] = current;

  const futureId = c.connections.filter(connection => connection !== b.id)[0];
  if (futureId) {
    traversePoints(points, set, b, c, points[futureId], cb);
  } else {
    cb(set);
  }
}

export default Drawing;

function calculateNewCoords(a, b, c, modifiedAngle, compensatedAngle) {
  const baseAngle = calculateDegrees(a, b, c);

  let newAngle = baseAngle - (compensatedAngle || modifiedAngle);

  const foo = (Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI + 180);
  const bar = (Math.atan2(c.y - b.y, c.x - b.x) * 180 / Math.PI + 180);
  const result = bar - foo;

  if (result <= 90 && result > 0) {
  } else if (result <= 180 && result > 90) {
  } else if (result >= -90 && result < 0) {
    newAngle = 0 - newAngle;
  } else if (result >= -180 && result < -90) {
    newAngle = 0 - newAngle;
  } else if (result >= -270 && result < -180) {
  } else {
    newAngle = 0 - newAngle;
  }

  const newCoords = rotate(b.x, b.y, c.x, c.y, newAngle);

  return newCoords;
}

function calculateDegrees(A, B, C) {
  if (A && B && C) {
    const AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
    const BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
    const AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    const angle = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
    const degrees = Math.floor(angle * 180 / Math.PI);

    return degrees;
  }

  return null;
}

function rotate(cx, cy, nx, ny, angle) {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  let x = (cos * (nx - cx)) + (sin * (ny - cy)) + cx;
  let y = (cos * (ny - cy)) - (sin * (nx - cx)) + cy;

  return { x, y };
}

function modifyPoints(modifyPoint, points, current, diff, set = {}) {
  const nextId = current.connections && current.connections[1];

  let x;
  let y;

  const diffX = Math.abs(diff.origin.x - diff.new.x);
  const diffY = Math.abs(diff.origin.y - diff.new.y);

  if (diff.origin.x > diff.new.x && diff.origin.y <= diff.new.y) {
    x = current.x - diffX;
    y = current.y + diffY;
  } else if (diff.origin.x > diff.new.x && diff.origin.y > diff.new.y) {
    x = current.x - diffX;
    y = current.y - diffY;
  } else if (diff.origin.x <= diff.new.x && diff.origin.y > diff.new.y) {
    x = current.x + diffX;
    y = current.y - diffY;
  } else if (diff.origin.x <= diff.new.x && diff.origin.y <= diff.new.y) {
    x = current.x + diffX;
    y = current.y + diffY;
  }

  if (!set[current.id]) set[current.id] = Object.assign({} ,points[current.id]);
  set[current.id].x = x;
  set[current.id].y = y;

  modifyPoint(
    current.id,
    x,
    y,
  );

  if (nextId) modifyPoints(modifyPoint, points, points[nextId], diff, set);
}

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

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}
