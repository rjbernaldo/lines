import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GButton from 'grommet/components/Button';

class LineList extends React.Component {
  constructor(props) {
    super(props);

    this.renderLines = this.renderLines.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderLines(k, i) {
    const points = this.props.points;
    const current = points[k];

    if (current.next) {
      const next = points[current.next];
      const label = `Length: ${calculateLength(current, next)}`;

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

  handleClick() {
    console.log('line');
  }

  render() {
    return (
      <GBox pad="medium">
        {
          Object
            .keys(this.props.points)
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

  return parseInt(Math.sqrt(a*a + b*b));
}
