import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { setDraw, setSelect } from '../actions/mode';
import { deletePoints } from '../actions/drawing';

const mapStateToProps = (state) => {
  const points = state.drawing.points;

  return {
    mode: state.mode,
    numberOfBends: (() => {
      return Object
        .keys(points)
        .map((p) => {
          const point = points[p];
          return point.connections.length === 2 ? 1 : 0;
        });
    })().reduce((a, b) => a + b, 0),
    totalLength: generateLines(points).map((line, i) => {
      const currentId = line[0];
      const nextId = line[1];

      if (nextId) {
        const c = points[currentId];
        const n = points[nextId];
        const length = calculateLength(c, n);

        return length;
      }

      return 0;
    }).reduce((a, b) => a + b, 0),
    ids: Object.keys(points),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePoints: (ids) => {
      dispatch(deletePoints(ids));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

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
