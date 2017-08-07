import React, { Component } from 'react';

class LineList extends React.Component {
  constructor(props) {
    super(props);

    this.renderLines = this.renderLines.bind(this);
  }

  renderLines(k, i) {
    const points = this.props.points;
    const current = points[k];

    if (current.next) {
      const next = points[current.next];

      return (
        <li key={i}>{`Line ${parseInt(k) + 1} length: ${calculateLength(current, next)}`}</li>
      );
    }

    return null;
  }

  render() {
    return (
      <ul>
        {
          Object
            .keys(this.props.points)
            .map(this.renderLines)
        }
      </ul>
    );
  }
}

export default LineList;

function calculateLength(c, n) {
  const a = c.x - n.x;
  const b = c.y - n.y;

  return parseInt(Math.sqrt(a*a + b*b));
}
