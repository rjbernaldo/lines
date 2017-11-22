import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GButton from 'grommet/components/Button';
import GHeading from 'grommet/components/Heading';

class LineList extends React.Component {
  constructor(props) {
    super(props);

    this.renderLines = this.renderLines.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('line');
  }

  renderLines(line, i) {
    const { points } = this.props;
    const currentId = line[0];
    const nextId = line[1];

    if (nextId) {
      const current = points[currentId];
      const next = points[nextId];
      const length = calculateLength(current, next);
      const label = 'Length: xx';

      return (
        <GBox pad="none" style={{ paddingBottom: '5px' }} key={i}>
          <GButton
            style={{ paddingBottom: '5px' }}
            onClick={this.handleClick}
            label={label}
          />
        </GBox>
      );
    }

    return null;
  }

  render() {
    return (
      <GBox pad="medium">
        <GHeading tag="h3" style={{ WebkitUserSelect: 'none' }}>Lines</GHeading>
        {
          generateLines(this.props.points)
            .map(this.renderLines)
        }
      </GBox>
    );
  }
}

export default LineList;

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b), 10);
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
